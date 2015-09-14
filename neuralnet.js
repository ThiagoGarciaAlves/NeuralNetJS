var NeuralNetJS = function () {

    // Declaração das constantes
    const ncesc = 4;        // Número de neurônios da camada escondida
    const entrada = 2;      // Número de valores de entrada
    const saida = 1;        // Número de valores de saída
    const exemplos = 4;     // Número de exemplos

    // Declaração das variáveis
    var w = [];
    var W = [];
    var errodes;
    var Erroinst;
    var Erromg = 0;
    var erro = [];
    var niesc = [];
    var ni = [];
    var biasesc = [];
    var biass = [];
    var eta;
    var phiesc = [];
    var phi = [];
    var philesc = [];
    var phil = [];
    var delta = [];
    var deltaesc = [];
    var cont2, contt;
    var epocas = 100;       //Número de épocas de treinamento
    var funcao;
    var entradas = [[0,0], [0,1], [1,0], [1,1]]; //Vetores de exemplos de treinamento de entrada
    var saidas = [[0], [1], [1], [0]];

    // Bias e pesos iniciais
    for (var x = 0; x < ncesc; x++) {
        w.push([]);
        for (var y = 0; y < saida; y++) {
            w[x][y] = Math.random();
            console.log("w["+x+"]["+y+"] = "+w[x][y]);
        }
        W.push([]);
        for (var y = 0; y < entrada; y++) {
            W[x][y] = Math.random();
            console.log("W["+x+"]["+y+"] = "+W[x][y]);
        }
        biasesc[x] = Math.random();
    }
    for (var x = 0; x < saida; x++) {
        biass[x] = Math.random();
    }
    for (var x = 0; x < saida; x++) {
        console.log("Neurônio de Saida: bias["+x+"] = "+biass[x]);
    }
    for (var x = 0; x < ncesc; x++) {
        console.log("Neurônios da camada escondida: bias["+x+"] = "+biasesc[x]);
    }

};