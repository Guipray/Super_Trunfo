var carta1 = {
  nome: "Finn",
  atributos: {
    ataque: 7,
    defesa: 4,
    magia: 2
  },
  img:
    "http://pm1.narvii.com/6570/726ad8fe255e34df3423744f061a3b281318599f_00.jpg"
};

var carta2 = {
  nome: "Harry Potter",
  atributos: {
    ataque: 3,
    defesa: 7,
    magia: 8
  },
  img:
    "https://kanto.legiaodosherois.com.br/w250-h250-gnw-cfill-q95-gcc/wp-content/uploads/2021/06/legiao_ORJtEWrY1VGD.jpg"
};

var carta3 = {
  nome: "Relâmpago Mcqueen",
  atributos: {
    ataque: 5,
    defesa: 8,
    magia: 0
  },
  img: "https://lumiere-a.akamaihd.net/v1/images/cars80-1200x801_7b6d9330.jpg"
};

var carta4 = {
  nome: "Mineirinho",
  atributos: {
    ataque: 8,
    defesa: 3,
    magia: 5
  },
  img:
    "https://adrenaline.com.br/uploads/chamadas/mineirinho_directors_cut_steam_chamada.jpg"
};

var carta5 = {
  nome: "stitch",
  atributos: {
    ataque: 8,
    defesa: 6,
    magia: 3
  },
  img: "https://i.pinimg.com/564x/b0/09/f0/b009f0bafbaf973c7d7a400c0ad71ae4.jpg"
};

var cartas = [carta1, carta2, carta3, carta4, carta5];

var cartaMaquina = [carta3, carta4];
var cartaJogador = [carta1, carta2, carta5];
var cartaEscolhidaMaquina;
var cartaEscolhidaJogador;

function sortearCarta() {
  var botãoIniciar = document.getElementById("botãoIniciar");
  botãoIniciar.innerHTML =
    "<button class='button-jogar' type='button' id='btnJogar' onclick='jogar()' disabled='false'>Jogar</button>";
  var elementoResultado = document.getElementById("resultado");
  var elementoResultadoFinal = document.getElementById("resultadoFinal");
  if (cartaMaquina.length == 0) {
    elementoResultadoFinal.innerHTML =
      "<p class='resultado-final'>O Adversário Está Sem Cartas! Você GANHOU! Resete para jogar novamente!</p>";
    var divCartaMaquina = document.getElementById("carta-maquina");
    divCartaMaquina.style.backgroundImage = ``;
    elementoResultado.innerHTML = "";
    document.getElementById("btnSortear").disabled = true;
    document.getElementById("btnJogar").disabled = true;
  }
  if (cartaJogador.length == 0) {
    elementoResultadoFinal.innerHTML =
      "<p class='resultado-final'>Você Perdeu Todas as Cartas! FIM DE JOGO! Resete para jogar novamente!</p>";
    var divCartaJogador = document.getElementById("carta-jogador");
    divCartaJogador.style.backgroundImage = ``;
    elementoResultado.innerHTML = "";
    document.getElementById("btnSortear").disabled = true;
    document.getElementById("btnJogar").disabled = true;
  }
  var numeroCartaMaquina = parseInt(Math.random() * cartaMaquina.length);
  cartaEscolhidaMaquina = cartaMaquina[numeroCartaMaquina];

  var numeroCartaJogador = parseInt(Math.random() * cartaJogador.length);
  while (numeroCartaMaquina == numeroCartaJogador) {
    numeroCartaJogador = parseInt(Math.random() * cartaJogador.length);
  }
  cartaEscolhidaJogador = cartaJogador[numeroCartaJogador];

  var imagemCartaJogador = "<img src=" + cartaEscolhidaJogador["img"] + ">";
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.innerHTML = imagemCartaJogador;

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  exibirCartaJogador();
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");
  var s = 0;

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      var elementoError = document.getElementById("error");
      elementoError.innerHTML = "";
      return radioAtributos[i].value;
    } else {
      s++;
      if (s == radioAtributos.length) {
        var elementoError = document.getElementById("error");
        elementoError.innerHTML =
          "<h1>Como você não escolheu nenhum atributo eu escolhi o ataque por você!</h1>";
        return radioAtributos[0].value;
      }
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var elementoResultado = document.getElementById("resultado");
  var valorCartaJogador = cartaEscolhidaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaEscolhidaMaquina.atributos[atributoSelecionado];

  if (valorCartaJogador > valorCartaMaquina) {
    elementoResultado.innerHTML =
      "<p class='resultado-final'>Você Venceu e Ganhou a Carta Adversária! Sorteie outra carta!</p>";
    cartaJogador.push(cartaEscolhidaMaquina);
    var pos = cartaMaquina.indexOf(cartaEscolhidaMaquina);
    var itemRemovido = cartaMaquina.splice(pos, 1);
  } else if (valorCartaMaquina > valorCartaJogador) {
    elementoResultado.innerHTML =
      "<p class='resultado-final'>Você Perdeu e Teve que dar sua Carta! Sorteie outra carta!</p>";
    cartaMaquina.push(cartaEscolhidaJogador);
    var pos = cartaJogador.indexOf(cartaEscolhidaJogador);
    var itemRemovido = cartaJogador.splice(pos, 1);
  } else {
    elementoResultado.innerHTML =
      "<p class='resultado-final'>Empatou! Sorteie outra carta!</p>";
  }
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnSortear").disabled = false;
  exibirCartaMaquina();
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaEscolhidaJogador.img})`;
  // divCartaJogador.style.backgroundImage = "url(" + cartaJogador.img + ")"
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaEscolhidaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaEscolhidaJogador.atributos[atributo] +
      "<br>";
  }
  var nome = `<p class="carta-subtitle">${cartaEscolhidaJogador.nome}</p>`;
  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaEscolhidaMaquina.img})`;
  // divCartaJogador.style.backgroundImage = "url(" + cartaJogador.img + ")"
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaEscolhidaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaEscolhidaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<p class="carta-subtitle">${cartaEscolhidaMaquina.nome}</p>`;
  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function resetar() {
  cartaMaquina = [carta3, carta4];
  cartaJogador = [carta1, carta2, carta5];
  cartaEscolhidaMaquina = "";
  cartaEscolhidaJogador = "";
  var cartaPadrão = document.getElementById("carta-maquina");
  cartaPadrão.innerHTML =
    "<img src='https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png' style=' width: inherit; height: inherit; position: absolute;'>";
  cartaPadrão.style.backgroundImage = ``;
  var errorVazio = document.getElementById("error");
  errorVazio.innerHTML = "";
  var resultadoVazio = document.getElementById("resultado");
  resultadoVazio.innerHTML = "";
  var resultadoFinalVazio = document.getElementById("resultadoFinal");
  resultadoFinalVazio.innerHTML = "";

  sortearCarta();
}