var NeuralNetJS = function () {

    // Declaração das constantes
    const ncesc = 4;        // Número de neurônios da camada escondida
    const entrada = 2;      // Número de valores de entrada
    const saida = 1;        // Número de valores de saída
    const exemplos = 4;     // Número de exemplos

    // Declaração das variáveis
    var w = [];
    var W = [];
    var errodes = 0.1;  // Erro desejado
    var Erroinst;
    var Erromg = 0;
    var erro = [];
    var niesc = [];
    var ni = [];
    var biasesc = [];
    var biass = [];
    var eta = 0.7;      // Taxa de aprendizagem
    var phiesc = [];
    var phi = [];
    var philesc = [];
    var phil = [];
    var delta = [];
    var deltaesc = [];
    var epocas = 100;   // Número de épocas de treinamento
    var funcao = 2;     // Função desejada [(1)degrau, (2)sigmoid]
    var entradas = [[0,0], [0,1], [1,0], [1,1]];    // Vetores de exemplos de treinamento de entrada
    var saidas = [[0], [1], [1], [0]];              // Vetores de exemplos de treinamento de saida

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

    console.info("Iniciando processo iterativo...");

    // Treinamento
    for (var x = 0; x < epocas; x++) {
        for (var y = 0; y < exemplos; y++) {
            for (var contt = 0; contt < ncesc; contt++) {
                niesc[contt] = 0;
                for (var cont2 = 0; cont2 < entrada; cont2++) {
                    niesc[contt] = niesc[contt] + W[contt][cont2] * entradas[cont2][y];
                }
                niesc[contt] = niesc[contt] + biasesc[contt];
                switch (funcao) {
                    case 1:
                        if (niesc[contt] > 0) {
                            phiesc[contt] = 1
                        } else {
                            phiesc[contt] = 0;
                        }
                        break;
                    case 2:
                        phiesc[contt] = 1/(1 + Math.exp(-niesc[contt]));
                        break;
                }
            }
            for (var contt = 0; contt < saida; contt++) {
                ni[contt] = 0;
                for (var cont2 = 0; cont2 < ncesc; cont2++) {
                    ni[contt] = ni[contt] + w[contt][cont2] * phiesc[cont2];
                }
                ni[contt] = ni[contt] + biass[contt];
                switch (funcao) {
                    case 1:
                        if (ni[contt] > 0) {
                            phi[contt] = 1
                        } else {
                            phi[contt] = 0;
                        }
                        break;
                    case 2:
                        phi[contt] = 1/(1 + Math.exp(-ni[contt]));
                        break;
                }
            }
            for (var contt = 0; contt < saida; contt++) {
                erro[contt] = saidas[contt][y] - phi[contt];
            }
            Erroinst = 0;
            for (var contt = 0; contt < saida; contt++) {
                Erroinst = Erroinst + erro[contt] * erro[contt]/2;
            }
            Erromg = (Erromg*(x*exemplos + y) + Erroinst) / (x * exemplos + (y+1));
            if (Erromg < errodes) break;
            for (var cont2 = 0; cont2 < saida; cont2++) {
                phil[cont2] = Math.exp(-ni[cont2])/((1 + Math.exp(-ni[cont2]))*(1 + Math.exp(-ni[cont2])));
                delta[cont2] = -erro[cont2] * phil[cont2];
            }
            for (var cont2 = 0; cont2 < ncesc; cont2++) {
                philesc[cont2] = Math.exp(-ni[cont2])/((1 + Math.exp(-niesc[cont2])) * (1 + Math.exp(-niesc[cont2])));
                deltaesc[cont2] = 0;
                for (var contt = 0; contt < saida; contt++) {
                    deltaesc[cont2] = deltaesc[cont2] + philesc[cont2] * delta[contt] * w[contt][cont2];
                }
            }
            for (var cont2 = 0; cont2 < saida; cont2++) {
                for (var contt = 0; contt < ncesc; contt++) {
                    w[cont2][contt] = w[cont2][contt] - eta * delta[cont2] * phiesc[contt];
                }
                biass[cont2] = biass[cont2] - eta * delta[cont2] * phiesc[contt];
            }
            for (var cont2 = 0; cont2 < ncesc; cont2++) {
                for (var contt = 0; contt < entrada; contt++) {
                    W[cont2][contt] = W[cont2][contt] - eta * deltaesc[cont2] * entradas[contt][y];
                }
                biasesc[cont2] = biasesc[cont2] - eta * deltaesc[cont2] * entradas[contt][y];
            }
        }
        if (Erromg < errodes) {
            console.log("Finalizado pelo erro de "+x+" épocas de treinamento!");
            break;
        }
    }

    console.log("Treinamento Finalizado")

    console.log("biasesc", biasesc);
    console.log("biass", biass);
    console.log("w", w);
    console.log("W", W);

};