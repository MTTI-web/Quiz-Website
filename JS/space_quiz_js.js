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
        question: `What is the largest planet in the solar system?`,
        options: [
            {text: `Earth`, isCorrect: false},
            {text: `Saturn`, isCorrect: false},
            {text: `Jupiter`, isCorrect: true},
            {text: `Neptune`, isCorrect: false}
        ]
    },
    {
        question: `Our Milky Way Galaxy is which type of galaxy?`,
        options: [
            {text: `Lenticular Galaxy`, isCorrect: false},
            {text: `Spiral Galaxy`, isCorrect: true},
            {text: `Elliptical Galaxy`, isCorrect: false},
            {text: `Irregular Galaxy`, isCorrect: false}
        ]
    },
    {
        question: `What is the radius of Earth?`,
        options: [
            {text: `4005 km`, isCorrect: false},
            {text: `7689 km`, isCorrect: false},
            {text: `5048 km`, isCorrect: false},
            {text: `6371 km`, isCorrect: true}
        ]
    },
    {
        question: `What is the day on which the Sun's direct rays cross the celestial equator called?`,
        options: [
            {text: `The Solstice`, isCorrect: false},
            {text: `The Equinox`, isCorrect: true},
            {text: `The Aphelion`, isCorrect: false},
            {text: `The Ecliptic`, isCorrect: false}
        ]
    },
    {
        question: `What is the smallest planet in the solar system by mass?`,
        options: [
            {text: `Mercury`, isCorrect: true},
            {text: `Jupiter`, isCorrect: false},
            {text: `Mars`, isCorrect: false},
            {text: `Earth`, isCorrect: false}
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