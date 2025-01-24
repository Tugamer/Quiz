// Seleção de elementos
var listaPergunta = [
  {
      texto: "Qual era a princesa conhecida por ter cabelos longos e dourados?",
      opcoes: ["Rapunzel", "Aurora", "Branca de Neve", "Jasmine"],
      certa: 0
  }
];

var posicaoPergunta = 0;
var botaoInicia = document.getElementById('botaoInicia');
var areaPergunta = document.getElementById('areaPergunta');
var musicaFundo = document.getElementById('musicaFundo');
var efeitoScratch = document.getElementById('efeitoScratch');
var novaMusica = document.getElementById('novaMusica');
var containerMensagem = document.querySelector('.containerMensagem');
var quizVerdadeiro = document.querySelector('.quizVerdadeiro');

// Início do quiz
botaoInicia.addEventListener('click', comecaQuiz);

function comecaQuiz() {
  musicaFundo.play();
  botaoInicia.classList.add('sumido'); // Esconde o botão
  areaPergunta.classList.remove('sumido'); // Mostra as perguntas
  mostraPergunta();
}

function mostraPergunta() {
  if (posicaoPergunta >= listaPergunta.length) {
      trocaPraOutroQuiz();
      return;
  }

  var perguntaAtual = listaPergunta[posicaoPergunta];
  areaPergunta.innerHTML = `
      <p>${perguntaAtual.texto}</p>
      ${perguntaAtual.opcoes.map((opcao, index) =>
          `<button onclick="confereResposta(${index})">${opcao}</button>`).join('')}
  `;
}

function confereResposta(respostaClicada) {
  var perguntaAtual = listaPergunta[posicaoPergunta];

  if (respostaClicada === perguntaAtual.certa) {
      efeitoScratch.play();
      musicaFundo.pause();
      musicaFundo.currentTime = 0;
      containerMensagem.classList.remove('sumido');
      
      setTimeout(() => {
          containerMensagem.classList.add('sumido');
          novaInterface();
      }, 2000); // Mostra o novo layout após 2 segundos
  } else {
      alert("Errou! Tente de novo!");
  }
}

function novaInterface() {
  novaMusica.play();
  document.body.classList.replace('quizPrincesaBody', 'quizVerdadeiroBody');
  quizVerdadeiro.classList.remove('sumido');
}
