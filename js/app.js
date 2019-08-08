const firstAnswer = ["I", " ", "l", "o", "v", "e", " ", "J", "a", "v", "a", "S", "c", "r", "i", "p", "t"];
let userAnswer = [];
let chancesLeft = 6;



let game = {
    userGuess: function() {
        game.getAnswerLength();
        let letter = prompt("Guess a letter:");
    
        for(let i = 0; i < firstAnswer.length; i++) {
            if(letter === firstAnswer[i]) {
                userAnswer.splice(i, 0, letter);
            }
        }
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

        game.getAnswerLength();
        answerContainer.innerHTML = userAnswer.join("");
    }
}

