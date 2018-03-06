/* DOMContentLoaded evento o qual é disparado quando o HTML tiver carregado */
/* Isso permite que o script seja linkado na HEAD */
document.addEventListener("DOMContentLoaded", function() {
  /* ---- Carrega os controladores por ID ---- */
  let speedRotateCtl = document.querySelector("#rangeSpeed");
  let rangeColorCtr = document.querySelector("#rangeColor");
  let codeColorCtr = document.querySelector("#codeColor");
  let degPMinute = document.querySelector("#degPMinute");
  /* ---- Carrega todas as estrelas por Classe [ARRAY] ---- */
  let star = document.querySelectorAll(".star");
  let starPart = document.querySelectorAll("polygon");
  /* ---- Carrega todos os dplays ---- */
  let display = document.querySelectorAll(".display");

  /* ---- Variaveis de processamento ---- */
  /* Os valores atribuidos tem finalidade de inicialização da variável */
  /* guarda os graus incrementados */
  let grau = 0;
  /* guarda o tempo de delay */
  let delay = 0;
  /* guarda a função setInterval para controle de intervalo */
  let loop;
  /* guarda a cor em hexadecimal */
  let colorHex = codeColorCtr.value;
  /* guarda a quantidade de parte a ser preenchido */
  let fillStar = 0;

  /* ---- Inicialização da interface com usuário ---- */
  /* determina a quatidade de estrelas a ser preenchida */
  rangeColorCtr.max = starPart.length - 1;
  showDisplay(`${fillStar + 1}/${starPart.length} partes a receber cor`, 2);

  /* ---- Função para rotacionar ---- */
  function spin() {
    /* Percorre array star */
    for (let i of star) {
      i.style.transform = `rotate(${grau}deg)`;
    }
    /* incrementa os graus */
    grau += parseInt(degPMinute.value);
    showDisplay(`${grau} graus`, 1);
  }

  /* ---- Função para pintar ---- */
  function spray() {
    for (let i = 0; i <= fillStar; i++) {
      starPart[i].style.fill = colorHex;
    }
  }

  /* console.log(display[0]); */
  /* ---- Função display ---- */
  function showDisplay(msg, how) {
    display[how].innerHTML = msg;
  }

  /* ---- Configuração do relógio ---- */
  /* inicia */
  function setClock() {
    loop = setInterval(spin, delay);
  }
  /* reinicia */
  function resetClock() {
    clearInterval(loop);
    setClock();
  }
  /* para */
  function stopClock() {
    clearInterval(loop);
  }

  /* ---- Métodos interativos ---- */
  /* Todos os métodos a seguir são disparado al serem alterado através DOM */
  /* Altera o delay em ms */
  speedRotateCtl.onchange = function() {
    delay = parseFloat(speedRotateCtl.value);
    resetClock();
    let msg = `${degPMinute.value}º/${delay} ms`;
    showDisplay(msg, 0);
  };
  /* Altera a quantidade de parte a ser pitada */
  rangeColorCtr.onchange = function() {
    fillStar = parseInt(this.value);
    spray();
    let msg = `${fillStar + 1}/${starPart.length} partes a receber cor`;
    showDisplay(msg, 2);
  };
  /* Altera a cor em hexadecimal */
  codeColorCtr.onchange = function() {
    colorHex = this.value;
    spray();
  };
  degPMinute.onchange = function() {
    let msg = `${degPMinute.value}º/${delay} ms`;
    showDisplay(msg, 0);
  };

  alert('Modifique o delay para começar! \n https://github.com/wesleyBU/star-rotateJS');
});
