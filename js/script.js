let contador, chances, numero, tentativa
let numero_de_chances = 7
let numero_limite = 50
let pontuacao = 0
let recorde = 0
let rodada = 1
let rodada_numero_maximo = 5
let tentativas = []
let display_list = []
let pontos = [0, 0, 100, 90, 80, 70, 50, 30, 10]
let frases = ['Não! Essa foi cagada!', 'Parabéns!', 'Boa! Continue assim!', 'Faz melhor na próxima!', 'Melhore! Até eu consigo fazer mais que isso!', 'Parece que nem sabe jogar!', 'Já ia te chamar de burro!']
let frase = document.querySelector('#frase')
let pontos_jogador = document.querySelector('#pontos')
let rodada_jogador = document.querySelector('#rodada')
let recorde_jogador = document.querySelector('#recorde')
let frase_resposta = document.querySelector('#frase_resposta')
let jogar = document.querySelector('#jogar')
let display = document.querySelector('#entrada')
let resposta = document.querySelector('#resposta')
let h5 = document.querySelector('h5')
let botao
let storage = localStorage.getItem('recorde')

if (storage) {
    recorde = parseInt(storage)
}


document.body.addEventListener("keydown", (ev) => {
    tecla(ev.key)
})


function tecla(ev) {
    if (ev >= 0 && ev <= 9) { imprimir(ev) }
    if (ev == 'Enter') { verificar() }
    if (ev == 'Backspace') { apagar() }
}


function reset() {
    resposta.innerHTML = `Rodada ${rodada}/${rodada_numero_maximo} `
    chances = numero_de_chances
    contador = 1
    numero = sortear()
    display.innerHTML = ''
    frase.innerHTML = `Você tem <span>${chances}</span> chance(s) para acertar um número entre 0 e ${numero_limite}!`
    tentativas = []
    pontos_jogador.innerHTML = `Pontos: ${pontuacao}`
}


reset()


function jogar_novamente() {
    resposta.innerHTML = ''
    frase_resposta.innerHTML = ''
    pontuacao = 0
    rodada = 1
    reset()
}


function continuar() {
    if (contador == 0 && rodada < rodada_numero_maximo) {
        resposta.innerHTML = ''
        rodada += 1
        reset()
    }
}


function verificar() {
    if (contador > 0) {
        chutar()
    } else {
        continuar()
    }
}


function chutar() {
    contador += 1
    if (display.innerHTML == '') { display.innerHTML = 0 }
    n = parseInt(display.innerHTML)
    display.innerHTML = ''
    display_list = []
    tentativas.push(n)


    if (n == numero) {
        resposta.innerHTML = ''
        resp = `<p><span class="span">${n} é o número certo! Acertou na ${contador - 1}ª tentativa!</span><br><br><span class="span">${frases[contador - 2]}</span><br><br><br>`
        botao = resp + `<input type="button" class="continuar" value="  CONTINUAR PARA ${rodada + 1}ª RODADA  " onclick="continuar()"></p>`

        pontuacao += pontos[contador]
        contador = 0
        chances = 0
        pontos_jogador.innerHTML = `Pontos: ${pontuacao}`

        if (rodada == rodada_numero_maximo) {
            verifica_recorde(pontuacao)
            botao = resp + '<input type="button" class="continuar" value="  JOGAR NOVAMENTE  " onclick="jogar_novamente()"></p>'
        } else { display.innerHTML = botao }

        display.innerHTML = botao
    }

    if (contador > 0 && contador < numero_de_chances + 1) {

        if (n > numero) {
            resposta.innerHTML = `${n} é maior!`
            chances -= 1
        }

        if (n < numero) {
            resposta.innerHTML = `${n} é menor!`
            chances -= 1
        }

    }

    if (n != numero && contador == numero_de_chances + 1) {
        resposta.innerHTML = ''
        resp = `<p><span class="span">Você é muito burro! ${numero} era o número certo!</span><br><br><br>`
        botao = resp + `<input type="button" class="continuar" value="  CONTINUAR PARA ${rodada + 1}ª RODADA  " onclick="continuar()"></p>`
        chances -= 1
        contador = 0

        if (rodada == rodada_numero_maximo) {
            verifica_recorde(pontuacao)
            botao = resp + `<input type="button" class="continuar" value="  JOGAR NOVAMENTE  " onclick="jogar_novamente()"></p>`
            display.innerHTML = botao
        } else {
            display.innerHTML = botao
        }
    }

    frase.innerHTML = `Você tem <span>${chances}</span> chance(s) para acertar um número entre 0 e ${numero_limite}!`
}


function sortear() {
    let sorteio = Math.round(Math.random(1, numero_limite) * numero_limite) + 1
    if (sorteio >= numero_limite) { sorteio -= 2 }
    pontos_jogador.innerHTML = `Pontos: ${pontuacao}`
    rodada_jogador.innerHTML = `Rodada: ${rodada}/${rodada_numero_maximo}`
    recorde_jogador.innerHTML = `Recorde: ${recorde}`
    return sorteio
}


function imprimir(numero) {
    if (display.innerHTML != botao) {
        display_list.push(display.innerHTML)
        display.innerHTML += numero
    }
}


function apagar() {
    if (display.innerHTML != botao) {
        if (display_list.length > 0) {
            display.innerHTML = display_list.pop()
        }
        else {
            display.innerHTML = ''
        }
    }

}

function verifica_recorde(pontuacao) {
    if (recorde < pontuacao) {
        recorde = pontuacao
        localStorage.setItem('recorde', recorde)
        resposta.innerHTML = `Novo Recorde! ${recorde} pontos!!!`
    }
}
