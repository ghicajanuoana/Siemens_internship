import { questionPool } from "./questions.js";

const quizPageElement= document.getElementById('quiz-page-id');
const questionElement = document.getElementById('question');
const answerElement = document.querySelectorAll('.answer');

const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

const submitButton = document.getElementById('submit');

let currentQuestionId = 0;
let userScore = 0;

//randomizing the questions
function randomizeQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//when the box of an answer is checked, it will return true
function selectedAnswer() {
    let answer;
    for (let i = 0; i < answerElement.length; i++) {
        if (answerElement[i].checked) {
            answer = answerElement[i].id;
            break; 
        }
    }
    return answer;
}

//reference to question html element and answers html element
function nextQuestion() {
    answerElement.forEach(answer => answer.checked = false);

    const currentQuestion = questionPool[currentQuestionId];
    questionElement.innerText = currentQuestion.question;

    answer1.innerText = currentQuestion.option1;
    answer2.innerText = currentQuestion.option2;
    answer3.innerText = currentQuestion.option3;
    answer4.innerText = currentQuestion.option4;

    submitButton.disabled = true;
}

//the function when selecting an answer; if true => score++
//after selecting the answer, it verifies whether to go to the next question or if the quiz is finished
function selectAnswer() {
    const answer = selectedAnswer();
    if(currentQuestionId >=0 && currentQuestionId < questionPool.length){
       if(answer === questionPool[currentQuestionId].correctAnswer) {
           userScore++;
       }
       currentQuestionId++;

       if(currentQuestionId < questionPool.length) {
           nextQuestion();
       } else {
           quizPageElement.innerHTML = `
           <div style="text-align: center;">
           <h3>Your score is ${userScore}/${questionPool.length}</h3>
           </div>
           <button onclick="location.reload()">Start quiz again</button>
           `;
       }
    }
}

//the 'submit' button is enabled only if you choose an answer
function enableSubmit() {
    submitButton.disabled = false;
}

answerElement.forEach(answer => {
    answer.addEventListener('change', enableSubmit);
});

randomizeQuestions(questionPool);
submitButton.addEventListener('click',selectAnswer);
nextQuestion();