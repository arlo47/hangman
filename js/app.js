/**NOTES
 * having both chancesLeft and hangIndex is kind of redundant.
 * having my functions directly modify global variables does not follow functional programming methodology
 * 1 off problem on line 53 (view.drawHangMan())
 * Disable/fade out letters once they are picked
 */

let game = {
    firstAnswer: "I love JavaScript".split(""),
    userAnswer: [],
    alphabet: document.querySelectorAll("figure"),
    chancesLeft: 6,
    userGuess: function(e) {
        let letter = e.target.innerText;
        let wasWrong = true;

        for(let i = 0; i < game.firstAnswer.length; i++) {
            if(letter.toLowerCase() === game.firstAnswer[i].toLowerCase()) {
                game.userAnswer.splice(i, 1, letter);
                wasWrong = false;
            }
        }
        if(wasWrong) {
            console.log("Wrong! " + --game.chancesLeft + " changes left.");
            view.drawHangMan();
        }
        view.outputAnswer();
    },
    getAnswerLength: function() {
        for(let i = 0; i < game.firstAnswer.length; i++) {
            game.firstAnswer[i] === " " ? game.userAnswer.push(" ") : game.userAnswer.push("_");
        }
    }
}

let view = {
    hangIndex: 0,
    outputAnswer: function() {
        let answerContainer = document.getElementById("answer-container");

        answerContainer.innerHTML = "";
        answerContainer.innerHTML = game.userAnswer.join("");
    },
    drawHangMan: function() {
        let hangman = document.getElementById("hangman");
        let hangmanArr = ["hangman-0.jpg", "hangman-1.jpg", "hangman-2.jpg", "hangman-3.jpg", "hangman-4.jpg", "hangman-5.jpg", "hangman-6.jpg"];
        
        if(view.hangIndex < 5) {
            view.hangIndex++;
            hangman.src = "img/" + hangmanArr[view.hangIndex];
        } 
        else {
            view.hangIndex++;
            hangman.src = "img/" + hangmanArr[view.hangIndex];
            view.gameOver();
        }        
    },
    gameOver: function() {
        let gameOverContainer = document.getElementById("game-over");
        let overlay = document.getElementById("overlay");

        gameOverContainer.classList.toggle("hide");
        overlay.classList.toggle("hide");
    }
}

game.getAnswerLength();
game.alphabet.forEach((letter) => letter.addEventListener("click", game.userGuess));