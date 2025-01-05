let listaDeNumerosSorteados = [];
let numeroLimite = 100; // Para mudar a dificuldade do jogo, mude o número limite
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

mensagemInicial();

function exibirTextoNaTela(id, texto) {
    let campo = document.getElementById(id);
    campo.innerHTML = texto;
    
    // Sistema de leitura para a página
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela("titulo", "Jogo do número secreto");
    exibirTextoNaTela("subtitulo", `Escolha um número entre 1 e ${numeroLimite}`);
}

function verificarChute(){
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('titulo', 'Acertou!');
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} tentativas!`;
        mensagemTentativas = tentativas > 1 ? mensagemTentativas : 'Você descobriu o número secreto de primeira!';
        exibirTextoNaTela('subtitulo', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('subtitulo', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('subtitulo', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 5) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}