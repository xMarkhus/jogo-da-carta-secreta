let listaDeCartasSorteadas = [];
let numeroLimite = 100;
let cartaSecreta = gerarCartaSecreta();
tentativas = 1;


function mudarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
        {rate:1.2});

}

function exibirMensagemInicial() {
    mudarTextoNaTela('h1', 'Jogo da carta secreta');
    mudarTextoNaTela('p', `Escolha uma carta de número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == cartaSecreta) {
        mudarTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número da carta secreta com ${tentativas} ${palavraTentativa}`;       
        mudarTextoNaTela('p', mensagemTentativas);
        document.getElementById('chutar').setAttribute('disabled',true);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if (chute > cartaSecreta) {
            mudarTextoNaTela('p', 'O número é menor');

        }
        else {
            mudarTextoNaTela('p', 'O número é maior');
        }
        tentativas++;
        limparCampo()
    }
    
}

function gerarCartaSecreta(){
    let cartaSorteada = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeELementosNaLista = listaDeCartasSorteadas.length;
    
    if (quantidadeDeELementosNaLista == numeroLimite) {
        listaDeCartasSorteadas = [];
    }
    
    if (listaDeCartasSorteadas.includes(cartaSorteada)) {
        return gerarCartaSecreta();
    } else {
        listaDeCartasSorteadas.push(cartaSorteada);
        console.log(listaDeCartasSorteadas);
        return cartaSorteada;
    }
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}


function reiniciarJogo() {
    cartaSecreta = gerarCartaSecreta();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
