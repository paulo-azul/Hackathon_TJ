// 1. Módulo necessário para ler a entrada do usuário no terminal
const readline = require('readline');

// --- DADOS PREENCHIDOS COM BASE NO SEU DOCUMENTO ---
const entidades = [
    {id: 1, nome: 'Problemas de Consumo'},
    {id: 2, nome: 'Conflitos Cíveis e Criminais'},
    {id: 3, nome: 'Direito de Família'},
    {id: 4, nome: 'Questão Trabalhista'},
    {id: 5, nome: 'Outro Assunto'}
];

const perguntas = [
    {id: 101, texto: 'É um problema sobre um produto ou serviço que comprei ou contratei?'},
    {id: 102, texto: 'Envolve uma briga ou conflito com um vizinho, familiar ou outra pessoa?'},
    {id: 103, texto: 'São problemas de família, como pensão, guarda de filhos ou divórcio?'},
    {id: 104, texto: 'É uma questão do meu trabalho, com meu patrão ou empregado?'},
    {id: 105, texto: 'O problema se encaixa em outra categoria (governo, saúde, INSS, etc.)?'}
];

// Base de conhecimento mapeando cada área à sua pergunta correspondente
const respostas = [
    //[cite_start]// Pergunta 101 (Consumo) [cite: 7]
    {entidade_id: 1, pergunta_id: 101, resposta: 'SIM'},
    {entidade_id: 2, pergunta_id: 101, resposta: 'NAO'},
    {entidade_id: 3, pergunta_id: 101, resposta: 'NAO'},
    {entidade_id: 4, pergunta_id: 101, resposta: 'NAO'},
    {entidade_id: 5, pergunta_id: 101, resposta: 'NAO'},
    //[cite_start]// Pergunta 102 (Conflitos) [cite: 16]
    {entidade_id: 1, pergunta_id: 102, resposta: 'NAO'},
    {entidade_id: 2, pergunta_id: 102, resposta: 'SIM'},
    {entidade_id: 3, pergunta_id: 102, resposta: 'NAO'},
    {entidade_id: 4, pergunta_id: 102, resposta: 'NAO'},
    {entidade_id: 5, pergunta_id: 102, resposta: 'NAO'},
    //[cite_start]// Pergunta 103 (Família) [cite: 30]
    {entidade_id: 1, pergunta_id: 103, resposta: 'NAO'},
    {entidade_id: 2, pergunta_id: 103, resposta: 'NAO'},
    {entidade_id: 3, pergunta_id: 103, resposta: 'SIM'},
    {entidade_id: 4, pergunta_id: 103, resposta: 'NAO'},
    {entidade_id: 5, pergunta_id: 103, resposta: 'NAO'},
    //[cite_start]// Pergunta 104 (Trabalhista) [cite: 41]
    {entidade_id: 1, pergunta_id: 104, resposta: 'NAO'},
    {entidade_id: 2, pergunta_id: 104, resposta: 'NAO'},
    {entidade_id: 3, pergunta_id: 104, resposta: 'NAO'},
    {entidade_id: 4, pergunta_id: 104, resposta: 'SIM'},
    {entidade_id: 5, pergunta_id: 104, resposta: 'NAO'},
    //[cite_start]// Pergunta 105 (Outros) [cite: 68]
    {entidade_id: 1, pergunta_id: 105, resposta: 'NAO'},
    {entidade_id: 2, pergunta_id: 105, resposta: 'NAO'},
    {entidade_id: 3, pergunta_id: 105, resposta: 'NAO'},
    {entidade_id: 4, pergunta_id: 105, resposta: 'NAO'},
    {entidade_id: 5, pergunta_id: 105, resposta: 'SIM'},
];

// --- FUNÇÃO PARA ESCOLHER A MELHOR PERGUNTA (Estrutura Mantida) ---
function escolherMelhorPergunta(candidatosAtuais, perguntasJaFeitas, todasAsPerguntas, todasAsRespostas){
    const perguntasDisponiveis = todasAsPerguntas.filter(p => !perguntasJaFeitas.includes(p.id));

    const perguntasAvaliadas = perguntasDisponiveis.map(pergunta => {
        let contagemSim = 0;
        let contagemNao = 0;

        for (const candidato of candidatosAtuais){
            const respostaEncontrada = todasAsRespostas.find(r => r.entidade_id === candidato.id && r.pergunta_id === pergunta.id);

            if (respostaEncontrada){
                if(respostaEncontrada.resposta === 'SIM'){
                    contagemSim++;
                }
                else if (respostaEncontrada.resposta ==='NAO'){
                    contagemNao++;
                }
            }
        }

        const totalRespostas = contagemSim + contagemNao;
        if (totalRespostas === 0){
            return {...pergunta, qualidade_ponderada: 0};
        }

        const proporcaoSim = contagemSim / totalRespostas;
        const qualidade_divisao = 1 - Math.abs(proporcaoSim - 0.5) * 2;
        const fator_relevancia = totalRespostas / candidatosAtuais.length;
        const qualidade_ponderada = qualidade_divisao * fator_relevancia;

        return {...pergunta, qualidade_ponderada, contagemSim, contagemNao};
    });

    const perguntasOrdenadas = perguntasAvaliadas.sort((a, b) => b.qualidade_ponderada - a.qualidade_ponderada);

    if (perguntasOrdenadas.length > 0 && perguntasOrdenadas[0].qualidade_ponderada > 0){
        return perguntasOrdenadas[0];
    }

    return null;
}

//--- FUNÇÃO PARA CALCULAR OS PESOS (Estrutura Mantida) ---

function calcularPesosDasEntidades(historicoDeRespostas, todasAsEntidades, todasAsRespostas) {
    let entidadesComPeso = todasAsEntidades.map(e => ({ ...e, peso: 1 })); 

    for (const entidade of entidadesComPeso) {
        let pesoAtual = 1;

        for (const passo of historicoDeRespostas) {
            const respostaDaEntidadeParaPergunta = todasAsRespostas.find(
                r => r.entidade_id === entidade.id && r.pergunta_id === passo.questionId
            );

            if (respostaDaEntidadeParaPergunta) {
                if (respostaDaEntidadeParaPergunta.resposta === passo.answer) {
                    pesoAtual += 1;
                } else {
                    pesoAtual -= 1;
                }
            }
        }
        entidade.peso = Math.max(0.01, pesoAtual);
    }

    const somaDosPesos = entidadesComPeso.reduce((sum, e) => sum + e.peso, 0);
    if (somaDosPesos > 0) {
        entidadesComPeso = entidadesComPeso.map(e => ({ ...e, peso: e.peso / somaDosPesos }));
    }

    return entidadesComPeso.sort((a, b) => b.peso - a.peso);
}

// --- NOVA FUNÇÃO DE QUESTIONÁRIO INTERATIVO ---

// 2. Configura a interface para ler e escrever no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniciarQuestionarioInterativo() {
    console.log(`--- INICIANDO QUESTIONÁRIO INTERATIVO ---`);
    console.log(`Responda às perguntas para identificar a área do seu problema.\n`);

    let historicoDeRespostas = [];
    let rodada = 1;

    // Função recursiva que guia o questionário
    function proximaRodada() {
        console.log(`--- Rodada ${rodada} ---`);
        
        const entidadesComPesos = calcularPesosDasEntidades(historicoDeRespostas, entidades, respostas);
        
        console.log('Probabilidades Atuais:');
        entidadesComPesos.forEach(e => console.log(`  - ${e.nome}: ${e.peso.toFixed(4)}`));

        // Condição de parada por alta probabilidade
        if (entidadesComPesos.length > 1 && entidadesComPesos[0].peso > (entidadesComPesos[1].peso*1.9)) {
            console.log(`\n--- FIM DO QUESTIONÁRIO ---`);
            console.log(`✅ Resultado encontrado: A área mais provável do seu problema é ${entidadesComPesos[0].nome}!`);
            console.log(`(A partir daqui, o sistema iniciaria as perguntas específicas para esta área.)`);
            rl.close(); // Encerra o programa
            return;
        }

        const threshold = entidadesComPesos[0].peso * 0.1;
        const candidatosParaPergunta = entidadesComPesos.filter(e => e.peso >= threshold);
        
        if (candidatosParaPergunta.length < 3 && entidadesComPesos.length > 2) {
            candidatosParaPergunta.push(...entidadesComPesos.slice(candidatosParaPergunta.length, 3));
        }

        const melhorPergunta = escolherMelhorPergunta(candidatosParaPergunta, historicoDeRespostas.map(h => h.questionId), perguntas, respostas);

        // Condição de parada se não houver mais perguntas úteis
        if (!melhorPergunta) {
            console.log(`\n--- FIM DO QUESTIONÁRIO ---`);
            console.log(`Não foi possível determinar um resultado com 100% de certeza.`);
            console.log(`O resultado mais provável é: ${entidadesComPesos[0].nome}`);
            rl.close();
            return;
        }

        console.log(`\nPergunta: "${melhorPergunta.texto}"`);
        
        // Pergunta ao usuário e aguarda a resposta
        rl.question('Sua resposta (1 para SIM, 2 para NÃO): ', (respostaUsuario) => {
            let respostaTexto;
            if (respostaUsuario.trim() === '1') {
                respostaTexto = 'SIM';
            } else if (respostaUsuario.trim() === '2') {
                respostaTexto = 'NAO';
            } else {
                console.log("\nResposta inválida. Por favor, digite 1 ou 2.\n");
                proximaRodada(); // Pergunta novamente sem avançar a rodada
                return;
            }

            // Adiciona a resposta ao histórico e continua para a próxima rodada
            historicoDeRespostas.push({ questionId: melhorPergunta.id, answer: respostaTexto });
            rodada++;
            console.log(''); // Adiciona uma linha em branco para espaçamento
            proximaRodada();
        });
    }

    // Inicia a primeira rodada do questionário
    proximaRodada();
}

// --- PARA INICIAR O PROGRAMA ---
iniciarQuestionarioInterativo();