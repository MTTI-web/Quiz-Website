// Selecting Elements
const quizBox = document.querySelector('.quiz');
const questionText = document.querySelector('.question-txt');
const optionsElement = document.querySelector('.options');
const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const nextButton = document.querySelector('.next');
const question = document.querySelector('.question');
const choice1 = document.querySelector('.choice1');
const choice2 = document.querySelector('.choice2');
const choice3 = document.querySelector('.choice3');
const choice4 = document.querySelector('.choice4');
const choiceElements = document.querySelectorAll('.option');
const correctAnswerMessage = document.querySelector('.correctResponseMessage');
const incorrectAnswerMessage = document.querySelector('.incorrectResponseMessage');
const scoreBoard = document.querySelector('.scoreBoard');
const scoreCircle = document.querySelector('.scoreCircle');
const scoreNumber = document.querySelector('.scoreNumber');
const totalScore = document.querySelector('.scoreTotal');
const backButton = document.querySelector('.back');
const choiceElementsArray = Array.from(choiceElements);

let currentQuestionIndex = 0;
let score = 0;
let questionShowCount = 0;
let responded = false;

function showQuestion() {
    question.classList.remove('hide');
};

function showNextQuestion(event) {
    responded = false;
    if (currentQuestionIndex === 5) {
        backButton.classList.remove('hide');
        restartButton.classList.remove('hide');
        question.classList.add('hide');
        totalScore.classList.remove('hide');
        totalScore.classList.add('scoreGrid');
        scoreNumber.textContent = score;
        if (score === 5) {
            scoreBoard.textContent = `Yay! You got full points!`
        } else if (score === 4) {
            scoreBoard.textContent = `Very good!`
        }
        else if (score === 3) {
            scoreBoard.textContent = `Nice, but you could have done better.`
        } else if (score < 3) {
            scoreBoard.textContent = `You should try again. Better luck next time!`
        }
    }
    if (currentQuestionIndex > 3) {
        nextButton.textContent = 'See score';
    }
    if (currentQuestionIndex < 5) {
        questionText.textContent = questions[currentQuestionIndex].question
        choice1.textContent = questions[currentQuestionIndex].options[0].text
        choice2.textContent = questions[currentQuestionIndex].options[1].text
        choice3.textContent = questions[currentQuestionIndex].options[2].text
        choice4.textContent = questions[currentQuestionIndex].options[3].text
    }
    nextButton.classList.add('hide');
    choiceElementsArray.forEach((option) => {
        if (option.classList.contains('correct')) {
            option.classList.remove('correct');
        } else if (option.classList.contains('wrong')) {
            option.classList.remove('wrong');
        }
    })
    if (!correctAnswerMessage.classList.contains('hide')) {
        correctAnswerMessage.classList.add('hide');
    }
    if (!incorrectAnswerMessage.classList.contains('hide')) {
        incorrectAnswerMessage.classList.add('hide');
    }
    currentQuestionIndex++;
    questionShowCount++;
}

function startQuiz() {
    startButton.classList.add('hide');
    showQuestion();
    showNextQuestion();
};

function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    restartButton.classList.add('hide');
    showQuestion();
    showNextQuestion();
    totalScore.classList.remove('scoreGrid');
    totalScore.classList.add('hide');
    nextButton.textContent = "Next";
    backButton.classList.add('hide');
}

function checkAnswer(event) {
    if (!responded) {
        questions[currentQuestionIndex - 1].options.forEach((answer) => {
            if (event.currentTarget.textContent === answer.text) {
                if (answer.isCorrect) {
                    event.currentTarget.classList.add('correct');
                    correctAnswerMessage.classList.remove('hide');
                    score++;
                } else {
                    event.currentTarget.classList.add('wrong');
                    incorrectAnswerMessage.classList.remove('hide');
                }
            }
        })
        responded = true;
    }
    nextButton.classList.remove('hide');
};

const questions = [
    {
        question: `Which of the following is the symbol for the element for 'Iron'?`,
        options: [
            {text: `F`, isCorrect: false},
            {text: `Fe`, isCorrect: true},
            {text: `I`, isCorrect: false},
            {text: `C`, isCorrect: false}
        ]
    },
    {
        question: `Which of the follwing is the SI unit of Speed?`,
        options: [
            {text: `m`, isCorrect: false},
            {text: `s`, isCorrect: false},
            {text: `m/s`, isCorrect: true},
            {text: `ms`, isCorrect: false}
        ]
    },
    {
        question: `What is the control centre of a cell?`,
        options: [
            {text: `Nucleus`, isCorrect: true},
            {text: `Golgi Apparatus`, isCorrect: false},
            {text: `Endoplasmic Reticulum`, isCorrect: false},
            {text: `Lysosome`, isCorrect: false}
        ]
    },
    {
        question: `Which of following is the SI unit of Force`,
        options: [
            {text: `Pascal`, isCorrect: false},
            {text: `Couloumb`, isCorrect: false},
            {text: `Dyne`, isCorrect: false},
            {text: `Newton`, isCorrect: true},
        ]
    },
    {
        question: `What is the boiling point of water in degree Celsius?`,
        options: [
            {text: `183`, isCorrect: false},
            {text: `200`, isCorrect: false},
            {text: `100`, isCorrect: true},
            {text: `77`, isCorrect: false}
        ]
    }
];

startButton.addEventListener('click', startQuiz);
if (currentQuestionIndex < 5) {
    nextButton.addEventListener('click', showNextQuestion);
}

restartButton.addEventListener('click', resetQuiz);

choiceElementsArray.forEach((choiceElement) => {
    choiceElement.addEventListener('click', checkAnswer);
})