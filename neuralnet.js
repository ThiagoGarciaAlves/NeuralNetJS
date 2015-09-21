var NeuralNetJS = function () {

    // Declaração das constantes
    const ncesc = 2;        // Número de neurônios da camada escondida
    const entrada = 2;      // Número de valores de entrada
    const saida = 1;        // Número de valores de saída
    const exemplos = 4;     // Número de exemplos

    // Declaração das variáveis
    var w = [];         // Pesos da camada de saída
    var W = [];         // Pesos da camada escondida
    var errodes = 0.1;  // Erro desejado
    var Erroinst;       // Erro instantâneo
    var Erromg = 0;     // Erro médio global
    var erro = [];
    var niesc = [];
    var ni = [];
    var biasesc = [];
    var biass = [];
    var eta = 0.8;      // Taxa de aprendizagem
    var phiesc = [];
    var phi = [];
    var philesc = [];
    var phil = [];
    var delta = [];
    var deltaesc = [];
    var epocas = 1000;   // Número de épocas de treinamento
    var funcao = 2;     // Função desejada [(1)degrau, (2)sigmoid]
    var entradas = [[0,0], [0,1], [1,0], [1,1]];    // Vetores de exemplos de treinamento de entrada
    var saidas = [[0], [1], [1], [0]];              // Vetores de exemplos de treinamento de saida

    // Bias e pesos iniciais
    for (var x = 0; x < entrada; x++) {
        W.push([]);
        for (var y = 0; y < ncesc; y++) {
            W[x][y] = Math.random();
            console.log("W["+x+"]["+y+"] = "+W[x][y]);
        }
    }
    for (var x = 0; x < ncesc; x++) {
        w.push([]);
        for (var y = 0; y < saida; y++) {
            w[x][y] = Math.random();
            console.log("w["+x+"]["+y+"] = "+w[x][y]);
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

            // Inicia-se o treinamento com a propagação do sinal de entrada

            // Calculo dos neurônios da camada escondida
            for (var contt = 0; contt < ncesc; contt++) {
                niesc[contt] = 0;
                for (var cont2 = 0; cont2 < entrada; cont2++) {
                    niesc[contt] = niesc[contt] + ( W[cont2][contt] * entradas[y][cont2] );
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
            // Calculo dos neurônios da camada de saída
            for (var contt = 0; contt < saida; contt++) {
                ni[contt] = 0;
                for (var cont2 = 0; cont2 < ncesc; cont2++) {
                    ni[contt] = ni[contt] + ( w[cont2][contt] * phiesc[cont2] );
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

            // Agora que já se tem o sinal de saída, inicia-se a retropropagação do sinal de erro

            // Calculo do erro dos neurônios de saída
            for (var contt = 0; contt < saida; contt++) {
                erro[contt] = saidas[y][contt] - phi[contt];
            }

            // Calculo do erro instantaneo e erro médio global para teste de finalização
            Erroinst = 0;
            for (var contt = 0; contt < saida; contt++) {
                Erroinst = Erroinst + ( erro[contt] * erro[contt]/2 );
            }
            Erromg = ((Erromg*(x*exemplos + y)) + Erroinst) / (x * exemplos + (y+1));

            if (Erromg < errodes) break;

            // Retropropagação
            // Calculo dos gradientes locais da camada de saída
            for (var cont2 = 0; cont2 < saida; cont2++) {
                phil[cont2] = Math.exp(-ni[cont2])/((1 + Math.exp(-ni[cont2]))*(1 + Math.exp(-ni[cont2])));
                delta[cont2] = -erro[cont2] * phil[cont2];
                for (var cont1 = 0; cont1 < ncesc; cont1++) {
                    philesc[cont1] = Math.exp(-ni[cont2])/((1 + Math.exp(-niesc[cont1])) * (1 + Math.exp(-niesc[cont1])));
                    deltaesc[cont1] = 0;
                    for (var contt = 0; contt < saida; contt++) {
                        deltaesc[cont1] = deltaesc[cont1] + philesc[cont1] * ( delta[contt] * w[cont1][contt] );
                    }
                }
            }

            // Calculo dos ajustes dos pesos da camada de saída
            for (var cont2 = 0; cont2 < saida; cont2++) {
                for (var contt = 0; contt < ncesc; contt++) {
                    w[contt][cont2] = w[contt][cont2] - ( eta * delta[cont2] * phiesc[contt] );
                    biass[cont2] = biass[cont2] - eta * delta[cont2] * phiesc[contt];
                }
            }

            for (var cont2 = 0; cont2 < ncesc; cont2++) {
                for (var contt = 0; contt < entrada; contt++) {
                    W[contt][cont2] = W[contt][cont2] - eta * deltaesc[cont2] * entradas[y][contt];
                    biasesc[cont2] = biasesc[cont2] - eta * deltaesc[cont2] * entradas[y][contt];
                }
            }

        }
        if (Erromg < errodes) {
            console.log("Finalizado pelo erro de "+x+" épocas de treinamento!");
            break;
        }
        console.log("Erromg("+x+"):", Erromg);
    }

    console.info("Treinamento Finalizado");

    console.log("biasesc", biasesc);
    console.log("biass", biass);
    console.log("w", w);
    console.log("W", W);

};