//gets words from a random word API, assigns word to game.answer
let apiHandler = {
    load: function() {
        const xhr = new XMLHttpRequest();
        //if api key expires https://random-word-api.herokuapp.com/
        xhr.open("GET", "https://random-word-api.herokuapp.com/word?key=9E4Z4S7A&number=1", true);
        
        xhr.onload = function() {
            //status 200: "Ok" | 403: "Forbidden" | 404: "Not Found"
            if(xhr.status == 200) {
                let word = JSON.parse(this.responseText);
                game.answer = word[0].toUpperCase();
            }
            else {
                console.log("xhr status is " + xhr.status);
            }
        };
        xhr.send();
    }
}



//does all processing for game
let game = {
    //answer to guess, pulled from random-word API onload
    answer: "TEST",
    //stores user input
    userAnswer: [],
    //node list of all user input options
    alphabet: document.querySelectorAll("figure"),
    //number of lives until gameOver()
    chancesLeft: 6,
    //used for hangmanArr index
    hangIndex: 0,
    userGuess: function(e) {
        let letter = e.target.innerText.toUpperCase();
        let wasWrong = true;

        //.not-valid makes the letter inactive (after being selected). You can only select each letter once.
        if(e.target.classList.contains("not-valid")) {
            return;
        }

        //if letter matches letters in answer array, add to userAnswer array
        for(let i = 0; i < game.answer.length; i++) {
            if(letter === game.answer[i]) {
                game.userAnswer.splice(i, 1, letter);
                wasWrong = false;
            }
        }

        view.outputAnswer();
        //add .not-valid to targeted letter
        view.disableLetter(e.target);
        
        //if not match wasWrong = true, lose a life and drawHangMan()
        if(wasWrong) {
            view.drawHangMan();
        }

        //otherwise check if game is over (userAnswer === answer)
        else {
            game.compareArrays();
        }
    },
    //adds _ to each letter and " " to each " " in userAnswer array, to match answer array.
    getAnswerLength: function() {
        game.userAnswer = [];
        for(let i = 0; i < game.answer.length; i++) {
            game.answer[i] === " " ? game.userAnswer.push(" ") : game.userAnswer.push("_");
        }
        view.outputAnswer();
    },
    //compares userAnswer to answer array, if they are the same, game is won
    compareArrays: function() {
        let isComplete = true;
        for(let i = 0; i < game.answer.length; i++) {
            if(game.userAnswer[i] == game.answer[i]) {
                isComplete = true;
            }
            else {
                isComplete = false;
                return;
            }
        }
        if(isComplete) {
            view.gameWon();
        }
    }
}



//outputs data processed by game to DOM
let view = {
    //outputs userAnswer to DOM
    outputAnswer: function() {
        let answerContainer = document.getElementById("answer-container");

        answerContainer.innerHTML = "";
        answerContainer.innerHTML = game.userAnswer.join("");
    },
    //adds to hangman drawing each time you guess incorrectly
    drawHangMan: function() {
        let hangman = document.getElementById("hangman");
        let hangmanArr = ["hangman-0.jpg", "hangman-1.jpg", "hangman-2.jpg", "hangman-3.jpg", "hangman-4.jpg", "hangman-5.jpg", "hangman-6.jpg"];
        
        if(game.hangIndex < 5) {
            game.hangIndex++;
            hangman.src = "img/" + hangmanArr[game.hangIndex];
        } 
        else {
            game.hangIndex++;
            hangman.src = "img/" + hangmanArr[game.hangIndex];
            view.gameOver();
        }        
    },
    //shows #game-over and #overlay elements in DOM when you lose
    gameOver: function() {
        let gameOverContainer = document.getElementById("game-over");
        let overlay = document.getElementById("overlay");

        gameOverContainer.classList.toggle("hide");
        overlay.classList.toggle("hide");

        apiHandler.load();
    },
    //shows #you-win and #overlay elements in DOM when you win
    gameWon: function() {
        let youWinContainer = document.getElementById("you-win");
        let overlay = document.getElementById("overlay");

        youWinContainer.classList.toggle("hide");
        overlay.classList.toggle("hide");

        apiHandler.load();
    },
    //hides all overlay menus
    playGame: function() {
        let gameOverContainer = document.getElementById("game-over");
        let youWinContainer = document.getElementById("you-win");
        let mainMenuContainer = document.getElementById("main-menu");
        let overlay = document.getElementById("overlay");

        gameOverContainer.classList.add("hide");
        youWinContainer.classList.add("hide");
        mainMenuContainer.classList.add("hide");
        overlay.classList.add("hide");

        game.getAnswerLength();
        this.enableLetters();
    },
    //adds .not-valid class to targeted letters
    disableLetter: function(letter) {
        letter.classList.add("not-valid");
    },
    enableLetters: function() {
        game.alphabet.forEach((letter) => letter.classList.remove("not-valid"));
    }
}
//creates a node list of all letter options in DOM
game.alphabet.forEach((letter) => letter.addEventListener("click", game.userGuess));