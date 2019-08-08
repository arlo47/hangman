/**NOTES
 * having both chancesLeft and hangIndex is kind of redundant.
 * having my functions directly modify global variables does not follow functional programming methodology
 * 1 off problem on line 53 (view.drawHangMan())
 */

const firstAnswer = ["I", " ", "l", "o", "v", "e", " ", "J", "a", "v", "a", "S", "c", "r", "i", "p", "t"];
const alphabet = document.querySelectorAll("figure");
let userAnswer = [];
let chancesLeft = 6;
let hangIndex = 0;

let game = {
    userGuess: function(e) {
        let letter = e.target.innerText;
        let wasWrong = true;

        for(let i = 0; i < firstAnswer.length; i++) {
            if(letter.toLowerCase() === firstAnswer[i].toLowerCase()) {
                userAnswer.splice(i, 1, letter);
                wasWrong = false;
            }
        }
        if(wasWrong) {
            console.log("Wrong! " + --chancesLeft + " changes left.");
            view.drawHangMan();
        }
        view.outputAnswer();
    },
    getAnswerLength: function() {
        for(let i = 0; i < firstAnswer.length; i++) {
            firstAnswer[i] === " " ? userAnswer.push(" ") : userAnswer.push("_");
        }
    }
}

let view = {
    toString: function() {
        console.log("Guess:  " + userAnswer.join(""));
        console.log("Answer: " + firstAnswer.join(""));
        console.log("Lives:  " + chancesLeft);
    },
    outputAnswer: function() {
        let answerContainer = document.getElementById("answer-container");

        answerContainer.innerHTML = "";
        answerContainer.innerHTML = userAnswer.join("");
    },
    drawHangMan: function() {
        let hangman = document.getElementById("hangman");
        let hangmanArr = ["hangman-0.jpg", "hangman-1.jpg", "hangman-2.jpg", "hangman-3.jpg", "hangman-4.jpg", "hangman-5.jpg", "hangman-6.jpg"];
        
        hangIndex < 6 ? hangIndex++ : view.gameOver();
        hangman.src = "img/" + hangmanArr[hangIndex];
    },
    gameOver: function() {
        let gameOverContainer = document.getElementById("game-over");
        gameOverContainer.classList.toggle("hide");
    }
}

game.getAnswerLength();
alphabet.forEach((letter) => letter.addEventListener("click", game.userGuess));