var perguntasDificilRespondidas = [];
var pontuacao = 0; 
var titulo = '';  
var posicaoPergunta = 0;
var botaoInicia = document.getElementById('botaoInicia');
var areaPergunta = document.getElementById('areaPergunta');
var caixaPrincipal = document.querySelector('.caixaPrincipal');
var caixaSecundaria = document.querySelector('.caixaSecundaria');
var mensagemKAKAAK = document.getElementById('mensagemKAKAAK');
var fundoAtivo = document.getElementById('fundoAtivo');
var musicaFundo = document.getElementById('musicaFundo');
var efeitoScratch = document.getElementById('efeitoScratch');
var novaMusica = document.getElementById('novaMusica');

// Lista de perguntas (Antigas)
const listaPergunta = [
  {
    texto: "Qual princesa é conhecida por ter cabelos longos e dourados?",
    opcoes: ["Rapunzel", "Aurora", "Branca de Neve", "Jasmine"],
    certa: 0
  }
];

// Novo quiz de perguntas difíceis
const listaPerguntaDificil = [
  {
    texto: "Qual é o nome do criador do jogo 'The Legend of Zelda'?",
    opcoes: ["Hideki Kamiya", "Hideo Kojima", "Yoko Taro", "Shigeru Miyamoto"],
    certa: 3,
    mensagemAcerto: "Isso aí, temos mais um zeldeiro por aqui!",
    mensagemErro: "Meu Deus, você não sabe o criador do melhor jogo do mundo?"
  },
  {
    texto: "Em qual ano foi lançado o primeiro jogo da franquia 'Super Mario Bros'?",
    opcoes: ["1983", "1985", "1987", "1990"],
    certa: 1,
    mensagemAcerto: "Parabéns! Você manja das origens do encanador bigodudo!",
    mensagemErro: "Eita! Parece que você precisa voltar para o mundo 1-1!"
  },
  {
    texto: "Qual é a principal arma usada pelo protagonista de 'DOOM'?",
    opcoes: ["BFG 9000", "Pistola", "Espingarda", "Motoserra"],
    certa: 0,
    mensagemAcerto: "Você é um verdadeiro Slayer! Muito bem!",
    mensagemErro: "Ops! Parece que você não conhece bem as armas do DOOM Slayer."
  },
  {
    texto: "Em 'The Witcher 3', qual é o nome do cavalo de Geralt?",
    opcoes: ["Spirit", "Roach", "Shadow", "Epona"],
    certa: 1,
    mensagemAcerto: "Certeza absoluta que Geralt ficaria orgulhoso!",
    mensagemErro: "Ouch! Até o Roach ficou desapontado com isso!"
  },
  {
    texto: "Qual jogo popular utiliza uma ilha chamada 'Erangel' como mapa?",
    opcoes: ["Call of Duty: Warzone", "Fortnite", "PUBG", "Apex Legends"],
    certa: 2,
    mensagemAcerto: "Boa! Você domina as ilhas de Erangel!",
    mensagemErro: "Errou! Parece que você não sobreviveu ao Battle Royale."
  },
  {
    texto: "Qual é o nome do personagem principal da franquia 'Metal Gear'?",
    opcoes: ["Solid Snake", "Big Boss", "Liquid Snake", "Ocelot"],
    certa: 0,
    mensagemAcerto: "Incrível! Solid Snake aprova sua resposta!",
    mensagemErro: "Não, não é esse! Nem mesmo Snake esperava isso!"
  },
  {
    texto: "Qual é o nome do vilão principal em 'Resident Evil 3'?",
    opcoes: ["Nemesis", "Tyrant", "Wesker", "Mr. X"],
    certa: 0,
    mensagemAcerto: "Uau, você derrotou o Nemesis com sua resposta!",
    mensagemErro: "Eita, cuidado! Parece que o Nemesis está vindo atrás de você agora!"
  },
  {
    texto: "Em 'Final Fantasy VII', qual é o nome da cidade natal de Cloud?",
    opcoes: ["Cosmo Canyon", "Midgar", "Nibelheim", "Wutai"],
    certa: 2,
    mensagemAcerto: "Show! Você é um verdadeiro fã de FFVII!",
    mensagemErro: "Não foi dessa vez! Cloud está desapontado."
  },
  {
    texto: "Qual é o nome do jogo indie onde você explora uma caverna cheia de tesouros e perigos?",
    opcoes: ["Celeste", "Hollow Knight", "Spelunky", "Terraria"],
    certa: 2,
    mensagemAcerto: "Você desbravou o desafio! Muito bem!",
    mensagemErro: "Oh não! Parece que você se perdeu na caverna."
  },
  {
    texto: "Qual é o nome do jogo que popularizou a frase 'The cake is a lie'?",
    opcoes: ["Aperture Science", "Half-Life", "Team Fortress", "Portal"],
    certa: 3,
    mensagemAcerto: "Você desbloqueou o portal para o conhecimento! Parabéns!",
    mensagemErro: "Ops! Parece que até o bolo está desapontado com isso."
  }
];

function sortearPerguntasDificil(perguntas) {
  // Filtra as perguntas difíceis que ainda não foram respondidas
  const perguntasNaoRespondidas = perguntas.filter((pergunta, index) => !perguntasDificilRespondidas.includes(index));

  // Se não houver perguntas não respondidas, reinicia a lista
  if (perguntasNaoRespondidas.length === 0) {
    perguntasDificilRespondidas = []; // Reinicia as perguntas respondidas
    return perguntas; // Reinicia o sorteio
  }

  // Sorteia uma pergunta difícil não respondida
  const indiceAleatorio = Math.floor(Math.random() * perguntasNaoRespondidas.length);
  const perguntaSorteada = perguntasNaoRespondidas[indiceAleatorio];

  // Armazena o índice da pergunta sorteada
  perguntasDificilRespondidas.push(perguntas.indexOf(perguntaSorteada));

  return perguntaSorteada;
}


// Função para sortear perguntas aleatoriamente
function sortearPerguntas(perguntas) {
  return perguntas.sort(() => Math.random() - 0.5);
}

// Início do quiz
botaoInicia.addEventListener('click', comecaQuiz);

function comecaQuiz() {
  musicaFundo.play();
  botaoInicia.classList.add('sumido');
  areaPergunta.classList.remove('sumido');
  mostraPergunta();
}

function mostraPergunta() {
  const listaAtual = (caixaSecundaria.style.display === 'flex') ? listaPerguntaDificil : listaPergunta;
  console.log("Lista atual de perguntas:", listaAtual);  // Debug

  if (posicaoPergunta >= listaAtual.length) {
    trocaPraOutroQuiz();
    return;
  }

  const perguntaAtual = listaAtual[posicaoPergunta];
  areaPergunta.innerHTML = ` 
    <p>${perguntaAtual.texto}</p>
    ${perguntaAtual.opcoes.map((opcao, index) => 
      `<button onclick="confereResposta(${index})">${opcao}</button>`).join('')}`;
}

function confereResposta(respostaClicada) {
  const listaAtual = (caixaSecundaria.style.display === 'flex') ? listaPerguntaDificil : listaPergunta;
  const perguntaAtual = listaAtual[posicaoPergunta];

  if (respostaClicada === perguntaAtual.certa) {
    pontuacao += 10; // Incrementa a pontuação para cada resposta correta
    efeitoScratch.play();
    musicaFundo.pause();
    musicaFundo.currentTime = 0;

    caixaPrincipal.classList.add('sumirSuavemente');
    fundoAtivo.classList.add('sumirSuavemente');

    setTimeout(() => {
      mensagemKAKAAK.classList.remove('sumido');
      mensagemKAKAAK.classList.add('aparecer');
    }, 1000);

    setTimeout(() => {
      mensagemKAKAAK.classList.remove('aparecer');
      mensagemKAKAAK.classList.add('desaparecer');
    }, 5000);

    setTimeout(() => {
      novaMusica.play();
    }, 3000);

    setTimeout(() => {
      fundoAtivo.style.backgroundImage = "url('images/novo.gif')";
      fundoAtivo.classList.remove('sumirSuavemente');
      caixaPrincipal.classList.add('sumido');
      caixaSecundaria.style.display = 'flex';
      posicaoPergunta = 0;
      mostraPerguntaDificil();
    }, 7700);
  } else {
    alert("Errou! Tente de novo!");
  }
}


function trocaPraOutroQuiz() {
  posicaoPergunta = 0;
  caixaPrincipal.classList.add('sumido');
  
  // Exibindo a caixaSecundaria corretamente
  caixaSecundaria.style.display = 'flex';
  mostraPerguntaDificil(); // Chama a função para mostrar a primeira pergunta do quiz difícil
}

function mostraPerguntaDificil() {
  const perguntaAtual = sortearPerguntasDificil(listaPerguntaDificil); // Usando o novo sorteio para evitar repetição

  if (!perguntaAtual) {
    exibirPontuacaoETitulo(); // Se não houver mais perguntas difíceis, exibe a pontuação e título
    return;
  }

  caixaSecundaria.innerHTML = ` 
    <p>${perguntaAtual.texto}</p>
    ${perguntaAtual.opcoes.map((opcao, index) => 
      `<button onclick="confereRespostaDificil(${index}, ${perguntaAtual.certa}, '${perguntaAtual.mensagemAcerto}', '${perguntaAtual.mensagemErro}')">${opcao}</button>`).join('')}`;
}


function confereRespostaDificil(respostaClicada, respostaCorreta, mensagemAcerto, mensagemErro) {
  if (respostaClicada === respostaCorreta) {
    pontuacao += 10;
    alert(mensagemAcerto);
  } else {
    alert(mensagemErro);
  }

  // Independentemente de acertar ou errar, avança para a próxima pergunta
  posicaoPergunta++;

  // Verifica se ainda há perguntas no quiz difícil
  if (posicaoPergunta >= listaPerguntaDificil.length) {
    exibirPontuacaoETitulo(); // Se acabou o quiz, exibe a pontuação e título
  } else {
    mostraPerguntaDificil(); // Caso contrário, mostra a próxima pergunta
  }
}


function exibirPontuacaoETitulo() {
  // Determina o título baseado na pontuação
  if (pontuacao >= 90) {
    titulo = 'Mestre Supremo dos Jogos!';
  } else if (pontuacao >= 70) {
    titulo = 'Jogador Experiente';
  } else if (pontuacao >= 50) {
    titulo = 'Aspirante a Gamer';
  } else {
    titulo = 'Noob Supremo';
  }

  // Atualiza o conteúdo da caixaSecundaria para mostrar a pontuação e título
  caixaSecundaria.innerHTML = `
    <h2>Fim do Quiz!</h2>
    <p>Sua pontuação: ${pontuacao}</p>
    <p>Título: ${titulo}</p>
    <button onclick="reiniciarQuiz()">Tentar de novo</button>
  `;
}

function reiniciarQuiz() {
  // Reseta os valores globais
  pontuacao = 0;
  posicaoPergunta = 0;
  perguntasDificilRespondidas = [];

  // Reinicia o conteúdo da caixa secundária
  caixaSecundaria.innerHTML = ""; 
  caixaSecundaria.style.display = 'flex';

  // Exibe a primeira pergunta do quiz difícil
  mostraPerguntaDificil();
}


