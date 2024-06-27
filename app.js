let listaDeNumerosSorteados = [];

mensagemInicial();

document.getElementById('chute').removeAttribute('disabled');


let numeroSecreto = numeroAleatório();

let tentativas = 1


document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
     const enter = document.querySelector('#chute');
     enter.click();
    }
});


function exibirTexto (tag, texto){
let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
exibirTexto ('h1', 'JOGO DO NÚMERO SECRETO');
exibirTexto ('p', 'Escolha um número de 1 a 100');
}


function verificarChute() {
    let chute = document.querySelector ('input').value
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');
        let paravraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o número secreto com ${tentativas} ${paravraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
    } else {
        tentativas++;
        if (chute > numeroSecreto){
            exibirTexto ('p', 'O número secreto é menor');
        } else {
            if (chute < numeroAleatório){
                exibirTexto ('p', 'O número secreto é maior');    
            }
        }
    } limparCampo();
}

function numeroAleatório() {
    let numeroEscolhido = parseInt(Math.random() * 100 + 1);
    let quantidadeDeElementosEscolhidos = listaDeNumerosSorteados.length;
    
    if (quantidadeDeElementosEscolhidos == 100) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return numeroAleatório();
    } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log (listaDeNumerosSorteados);
            return numeroEscolhido;
        }
    
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
}

function reiniciarJogo() {
    limparCampo();   
    numeroSecreto = numeroAleatório();
    mensagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);  
    document.getElementById('chute').removeAttribute('disabled');
}