/**NOTES
 * having both chancesLeft and hangIndex is kind of redundant.
 * having my functions directly modify global variables does not follow functional programming methodology
 * compareArrays() not invoking when sentence is complete
 */

let game = {
    //correct answer, user input is compared against this
    answer: "I love JavaScript".toUpperCase().split(""),
    //stores user input
    userAnswer: [],
    //node list of all user inpput options
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
            console.log("Wrong! " + --game.chancesLeft + " changes left.");
            view.drawHangMan();
        }
        //otherwise check if game is over (userAnwer === answer)
        else {
            game.compareArrays();
        }
    },
    //adds _ to each letter and " " to each " " in userAnswer array, to match answer array.
    getAnswerLength: function() {
        for(let i = 0; i < game.answer.length; i++) {
            game.answer[i] === " " ? game.userAnswer.push(" ") : game.userAnswer.push("_");
        }
        view.outputAnswer();
    },
    //compares userAnswer to answer array, if they are the same, game is won
    compareArrays: function() {
        let isComplete = true;
        for(let i = 0; i < this.answer.length; i++) {
            if(this.userAnswer[i] == this.answer[i]) {
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
    },
    //shows #you-win and #overlay elements in DOM when you win
    gameWon: function() {
        let youWinContainer = document.getElementById("you-win");
        let overlay = document.getElementById("overlay");

        youWinContainer.classList.toggle("hide");
        overlay.classList.toggle("hide");
    },
    //hides main menu when user clicks "play"
    playGame: function() {
        let mainMenuContainer = document.getElementById("main-menu");
        let overlay = document.getElementById("overlay");

        mainMenuContainer.classList.add("hide");
        overlay.classList.add("hide");
        game.getAnswerLength();
    },
    //adds .not-valid class to targeted letters
    disableLetter: function(letter) {
        letter.classList.add("not-valid");
    }
}
//creates a node list of all letter options in DOM
game.alphabet.forEach((letter) => letter.addEventListener("click", game.userGuess));