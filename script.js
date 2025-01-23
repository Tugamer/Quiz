var questions = [
    {
        question: "Qual princesa perdeu o sapatinho de cristal?",
        options: ["Cinderela", "Aurora", "Branca de Neve", "Rapunzel"],
        correct: 0
    },
    {
        question: "Qual princesa tem como animal de estimação um tigre chamado Rajah?",
        options: ["Jasmine", "Bela", "Rapunzel", "Ariel"],
        correct: 0
    },
    {
        question: "Quem acorda a Bela Adormecida com um beijo?",
        options: ["Príncipe Phillip", "Príncipe Eric", "Príncipe Adam", "Príncipe Naveen"],
        correct: 0
    }
];

var currentQuestion = 0;
var score = 0;
var startButton = document.getElementById('start-button');
var quizContainer = document.getElementById('quiz');
var music = document.getElementById('background-music');
var laughSound = document.getElementById('laugh-sound');

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    music.play();
    startButton.style.display = 'none'; // Esconde o botão "Começar Quiz"
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        alert('Parabéns, você completou o quiz!');
        changeToNewInterface();
        return;
    }

    var question = questions[currentQuestion];
    quizContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options.map(function(option, index) {
            return `
                <button onclick="checkAnswer(${index})">${option}</button>
            `;
        }).join('')}
    `;
}

function checkAnswer(selectedIndex) {
    var question = questions[currentQuestion];

    if (selectedIndex === question.correct) {
        score++;
        laughSound.play();
        alert('Você acertou! Preparando para a próxima fase...');
        currentQuestion++;
        showQuestion();
    } else {
        alert('Você errou! O quiz acabou!');
        changeToNewInterface();
    }
}

function changeToNewInterface() {
    quizContainer.classList.add('hidden');
    // A interface "quebrada" aparece aqui, você pode customizar o layout.
    document.body.innerHTML = '<h1>Agora, a verdadeira interface!</h1>';
}
