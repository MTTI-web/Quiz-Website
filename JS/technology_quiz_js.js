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
        question: `In which decade was the American Institute of Electrical Engineers (AIEE) founded?`,
        options: [
            {text: `1850s`, isCorrect: false},
            {text: `1880s`, isCorrect: true},
            {text: `1930s`, isCorrect: false},
            {text: `1950s`, isCorrect: false}
        ]
    },
    {
        question: `What is part of a database that holds only one type of information?`,
        options: [
            {text: `Report`, isCorrect: false},
            {text: `Record`, isCorrect: false},
            {text: `Field`, isCorrect: true},
            {text: `File`, isCorrect: false}
        ]
    },
    {
        question: `What does 'OS' computer abbreviation usually means?`,
        options: [
            {text: `Order of Significance`, isCorrect: false},
            {text: `Optical Sensor`, isCorrect: false},
            {text: `Open Software`, isCorrect: false},
            {text: `Operating System`, isCorrect: true}
        ]
    },
    {
        question: `'.MOV' extension refers usually to what kind of file?`,
        options: [
            {text: `Animation/movie file`, isCorrect: true},
            {text: `Image file`, isCorrect: false},
            {text: `Audio file`, isCorrect: false},
            {text: `MS Office document`, isCorrect: false}
        ]
    },
    {
        question: `In which decade with the first transatlantic radio broadcast occur?`,
        options: [
            {text: `1850s`, isCorrect: false},
            {text: `1900s`, isCorrect: true},
            {text: `1870s`, isCorrect: false},
            {text: `1860s`, isCorrect: false}
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