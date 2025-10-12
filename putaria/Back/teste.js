// 1. Módulo necessário para ler a entrada do usuário no terminal
const readline = require('readline');

// --- DADOS COMPLETOS (Estrutura Mantida) ---
const entidades = [
    {id: 1, nome: 'PROCON'},
    {id: 2, nome: 'Juizado Especial Cível (JEC)'},
    {id: 3, nome: 'Centros Judiciários de Solução de Conflitos e Cidadania (CEJUSCs)'},
    {id: 4, nome: 'Câmaras Privadas de Arbitragem e Mediação'},
    {id: 5, nome: 'Ministério Público do Estado da Bahia (MP/BA)'},
    {id: 6, nome: 'Câmara de Mediação da OAB-BA'},
    {id: 7, nome: 'Delegacia da Mulher e Ministério Público (Urgente)'},
    {id: 8, nome: 'Prefeitura Bairro (Balcão de Justiça)'},
    {id: 9, nome: 'Advogado Particular (via OAB)'},
    {id: 10, nome: 'Defensoria Pública'},
    {id: 11, nome: 'Ministério Público do Trabalho (NUPIA - para acordo)'},
    {id: 12, nome: 'Sindicato da Categoria ou Defensoria Pública da União (DPU)'},
    {id: 13, nome: 'Denúncia Urgente ao MPT ou Superintendência Regional do Trabalho'},
    {id: 14, nome: 'Denúncia ao MPT e orientação no Sindicato'},
    {id: 15, nome: 'Sindicato ou Superintendência Regional do Trabalho (para dúvidas)'},
    {id: 16, nome: 'Agência Nacional de Saúde Suplementar (ANS)'},
    {id: 17, nome: 'Justiça Federal (para negativas do INSS)'},
    {id: 18, nome: 'Recurso Administrativo no INSS'},
    {id: 19, nome: 'Reclamação no Banco Central e Mediação OAB'},
];
const perguntas = [
    // --- Perguntas Iniciais (sem pré-requisito) ---
    {id: 101, texto: 'O problema é sobre um produto ou serviço que comprei ou contratei?', preRequisito: null},
    {id: 102, texto: 'Envolve uma briga ou conflito com um vizinho, familiar ou outra pessoa?', preRequisito: null},
    {id: 103, texto: 'São problemas de família?', preRequisito: null},
    {id: 104, texto: 'É uma questão do meu trabalho, com meu patrão ou empregado?', preRequisito: null},
    {id: 105, texto: 'É sobre outro assunto (governo, saúde, INSS, moradia, banco)?', preRequisito: null},

    // --- Ramo Consumo (inicia com resposta à 101) ---
    {id: 201, texto: 'Você já tentou resolver diretamente com a empresa/lugar onde comprou?', preRequisito: { perguntaId: 101, resposta: 'SIM' }},
    {id: 202, texto: 'O que aconteceu após tentar resolver com a empresa?', preRequisito: { perguntaId: 201, resposta: 'SIM' }, opcoes: ["Não resolveram ou não responderam.", "Fizeram um acordo mas não cumpriram."]},

    // --- Ramo Conflitos (inicia com resposta à 102) ---
    {id: 301, texto: 'Existe alguma proposta de diálogo/acordo entre as pessoas envolvidas?', preRequisito: { perguntaId: 102, resposta: 'SIM' }},
    {id: 302, texto: 'A causa envolveu uma perda material muito grande (acima de R$ 56.480,00)?', preRequisito: { perguntaId: 301, resposta: 'SIM' }},
    {id: 303, texto: 'Houve agressão física, ameaça ou algum crime?', preRequisito: { perguntaId: 301, resposta: 'NAO' }},

    // --- Ramo Família (inicia com resposta à 103) ---
    {id: 401, texto: 'Qual o tipo de problema familiar?', preRequisito: { perguntaId: 103, resposta: 'SIM' }, opcoes: ["Pensão, guarda, visitas ou divórcio.", "Violência doméstica."]},
    {id: 402, texto: 'Há acordo (consenso) entre as pessoas envolvidas?', preRequisito: { perguntaId: 401, resposta: 'Pensão, guarda, visitas ou divórcio.' }},
    {id: 403, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 402, resposta: 'NAO' }},

    // --- Ramo Trabalhista (inicia com resposta à 104) ---
    {id: 501, texto: 'Seu problema trabalhista é sobre o quê?', preRequisito: { perguntaId: 104, resposta: 'SIM' }, opcoes: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho.", "Condições de trabalho ruins (assédio, insegurança).", "Dúvidas sobre contrato ou direitos."]},
    {id: 502, texto: 'Você possui/possuía carteira de trabalho assinada?', preRequisito: { perguntaId: 501, resposta: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."] }},
    {id: 503, texto: 'As pessoas envolvidas desejam negociar para chegar a um acordo?', preRequisito: { perguntaId: 502, resposta: ['SIM', 'NAO'] }},
    {id: 504, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 503, resposta: 'NAO' }},
    {id: 505, texto: 'A irregularidade coloca a vida de trabalhadores em risco imediato?', preRequisito: { perguntaId: 501, resposta: 'Condições de trabalho ruins (assédio, insegurança).' }},
];
const respostas = [];
const todasAsPerguntasIniciais = [101, 102, 103, 104, 105];

function popularRespostas(entidadeId, caminho) {
    for (const [perguntaId, resposta] of Object.entries(caminho)) {
        respostas.push({ entidade_id: entidadeId, pergunta_id: parseInt(perguntaId), resposta });
    }
    const perguntaInicialDoCaminho = todasAsPerguntasIniciais.find(id => caminho[id]);
    todasAsPerguntasIniciais.forEach(id => {
        if (id !== perguntaInicialDoCaminho) {
            // Garante que não sobrescrevemos uma resposta já definida se a entidade pertence a múltiplos caminhos
            if (!respostas.some(r => r.entidade_id === entidadeId && r.pergunta_id === id)) {
                 respostas.push({ entidade_id: entidadeId, pergunta_id: id, resposta: 'NAO' });
            }
        }
    });
}

const caminhos = {
    1: { 101: 'SIM', 201: 'SIM', 202: 'Não resolveram ou não responderam.' },
    2: { 101: 'SIM', 201: 'SIM', 202: 'Fizeram um acordo mas não cumpriram.' },
    3: { 102: 'SIM', 301: 'SIM', 302: 'SIM' },
    4: { 102: 'SIM', 301: 'SIM', 302: 'NAO' },
    5: { 102: 'SIM', 301: 'NAO', 303: 'SIM' },
    6: { 102: 'SIM', 301: 'NAO', 303: 'NAO' },
    7: { 103: 'SIM', 401: 'Violência doméstica.' },
    8: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'SIM' },
    9: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NAO', 403: 'SIM' },
    10: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NAO', 403: 'NAO' },
    11: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'SIM' },
    12: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'NAO', 504: 'NAO' },
    13: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'SIM' },
    14: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'NAO' },
    15: { 104: 'SIM', 501: 'Dúvidas sobre contrato ou direitos.' },
};

// Adiciona o caminho para Advogado Particular via Trabalhista
// (Isso precisa ser feito com cuidado para não apagar o caminho de Família)
const caminhoTrabalhistaAdv = { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'NAO', 504: 'SIM' };
for (const [perguntaId, resposta] of Object.entries(caminhoTrabalhistaAdv)) {
    respostas.push({ entidade_id: 9, pergunta_id: parseInt(perguntaId), resposta });
}


for (const [entidadeId, caminho] of Object.entries(caminhos)) {
    popularRespostas(parseInt(entidadeId), caminho);
}

// --- ALGORITMOS (Estrutura Mantida) ---

function escolherMelhorPergunta(candidatosAtuais, perguntasJaFeitas, todasAsPerguntas, todasAsRespostas, historicoDeRespostas){
    const perguntasDisponiveis = todasAsPerguntas.filter(p => !perguntasJaFeitas.includes(p.id));

    const perguntasValidas = perguntasDisponiveis.filter(p => {
        if (!p.preRequisito) return true;
        const passoAnterior = historicoDeRespostas.find(h => h.questionId === p.preRequisito.perguntaId);
        if (!passoAnterior) return false;
        const preRequisitoRespostas = Array.isArray(p.preRequisito.resposta) ? p.preRequisito.resposta : [p.preRequisito.resposta];
        return preRequisitoRespostas.includes(passoAnterior.answer);
    });

    const perguntasAvaliadas = perguntasValidas.map(pergunta => {
        let contagemRespostas = {};
        for (const candidato of candidatosAtuais){
            const respostaEncontrada = todasAsRespostas.find(r => r.entidade_id === candidato.id && r.pergunta_id === pergunta.id);
            if (respostaEncontrada) {
                const respostasPossiveis = Array.isArray(respostaEncontrada.resposta) ? respostaEncontrada.resposta : [respostaEncontrada.resposta];
                respostasPossiveis.forEach(r => {
                    if (!contagemRespostas[r]) contagemRespostas[r] = 0;
                    contagemRespostas[r]++;
                });
            }
        }
        
        const totalRespostas = Object.values(contagemRespostas).reduce((s, c) => s + c, 0);
        if (totalRespostas === 0) return {...pergunta, qualidade_ponderada: 0};
        
        const maiorGrupo = Object.values(contagemRespostas).length > 0 ? Math.max(...Object.values(contagemRespostas)) : 0;
        const qualidade_divisao = Object.keys(contagemRespostas).length > 1 ? 1 - (maiorGrupo / totalRespostas) : 0;
        const fator_relevancia = totalRespostas / candidatosAtuais.length;
        const qualidade_ponderada = qualidade_divisao * fator_relevancia;
        
        return {...pergunta, qualidade_ponderada};
    });

    const perguntasOrdenadas = perguntasAvaliadas.sort((a, b) => b.qualidade_ponderada - a.qualidade_ponderada);

    if (perguntasOrdenadas.length > 0 && perguntasOrdenadas[0].qualidade_ponderada > 0){
        return perguntasOrdenadas[0];
    }
    return null;
}

function calcularPesosDasEntidades(historicoDeRespostas, todasAsEntidades, todasAsRespostas) {
    let entidadesComPeso = todasAsEntidades.map(e => ({ ...e, peso: 1.0 })); 
    
    for (const entidade of entidadesComPeso) {
        let pesoAtual = 1.0;
        const bonusAcerto = 2.0;
        const penalidadeErro = 100.0;

        for (const passo of historicoDeRespostas) {
            const respostaDaEntidadeParaPergunta = todasAsRespostas.find(
                r => r.entidade_id === entidade.id && r.pergunta_id === passo.questionId
            );

            if (respostaDaEntidadeParaPergunta) {
                const respostaEntidade = respostaDaEntidadeParaPergunta.resposta;
                const respostaUsuario = passo.answer;
                const corresponde = Array.isArray(respostaEntidade) ? respostaEntidade.includes(respostaUsuario) : respostaEntidade === respostaUsuario;
                
                if (corresponde) {
                    pesoAtual *= bonusAcerto;
                } else {
                    pesoAtual /= penalidadeErro;
                }
            } else {
                 pesoAtual /= 2;
            }
        }
        entidade.peso = pesoAtual;
    }

    const somaDosPesos = entidadesComPeso.reduce((sum, e) => sum + e.peso, 0);
    if (somaDosPesos > 0) {
        entidadesComPeso = entidadesComPeso.map(e => ({ ...e, peso: e.peso / somaDosPesos }));
    }

    return entidadesComPeso.sort((a, b) => b.peso - a.peso);
}


// --- MOTOR INTERATIVO (com a nova lógica de auto-resposta) ---

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniciarQuestionarioInterativo() {
    console.log(`--- INICIANDO QUESTIONÁRIO DE ENCAMINHAMENTO ---`);
    let historicoDeRespostas = [];

    function proximaRodada() {
        // --- NOVO BLOCO LÓGICO ---
        // Verifica se as 4 primeiras perguntas foram respondidas com 'NAO'
        const idsPerguntasIniciais = new Set([101, 102, 103, 104]);
        const respostasNaoIniciais = historicoDeRespostas.filter(h =>
            idsPerguntasIniciais.has(h.questionId) && h.answer === 'NAO'
        );

        // Se a condição for atendida E a pergunta 105 ainda não foi respondida
        if (respostasNaoIniciais.length === 4 && !historicoDeRespostas.some(h => h.questionId === 105)) {
            console.log("\nEntendido. Como as opções anteriores não se aplicam, vamos assumir que seu caso se encaixa em 'Outro Assunto'.");
            // Adiciona a resposta 'SIM' para a pergunta 105 automaticamente
            historicoDeRespostas.push({ questionId: 105, answer: 'SIM' });
            // Reinicia a rodada para recalcular os pesos com a nova informação
            proximaRodada();
            return; // Impede que o resto da função atual execute
        }
        // --- FIM DO NOVO BLOCO LÓGICO ---


        const entidadesComPesos = calcularPesosDasEntidades(historicoDeRespostas, entidades, respostas);
        
        console.log('\n-------------------------------------');
        console.log('Principais Encaminhamentos Possíveis:');
        entidadesComPesos.slice(0, 5).forEach(e => {
            if (e.peso > 0.001) {
                 console.log(`  - ${e.nome}: ${(e.peso * 100).toFixed(2)}%`);
            }
        });

        if (entidadesComPesos[0].peso > 0.95) {
            console.log(`\n--- FIM DO QUESTIONÁRIO ---`);
            console.log(`✅ Encaminhamento Sugerido: ${entidadesComPesos[0].nome}`);
            rl.close();
            return;
        }

        const candidatosParaPergunta = entidadesComPesos.filter(e => e.peso > 0.001);
        const melhorPergunta = escolherMelhorPergunta(candidatosParaPergunta, historicoDeRespostas.map(h => h.questionId), perguntas, respostas, historicoDeRespostas);

        if (!melhorPergunta) {
            console.log(`\n--- FIM DO QUESTIONÁRIO ---`);
            console.log(`Não há mais perguntas para diferenciar os casos. O resultado mais provável é: ${entidadesComPesos[0].nome}`);
            rl.close();
            return;
        }

        console.log(`\nPergunta: "${melhorPergunta.texto}"`);
        
        if (melhorPergunta.opcoes) {
            melhorPergunta.opcoes.forEach((opcao, index) => console.log(`${index + 1}) ${opcao}`));
            rl.question('Digite o número da sua resposta: ', (respostaIndex) => {
                const index = parseInt(respostaIndex) - 1;
                if (isNaN(index) || index < 0 || index >= melhorPergunta.opcoes.length) {
                    console.log("\nOpção inválida.");
                    proximaRodada();
                } else {
                    historicoDeRespostas.push({ questionId: melhorPergunta.id, answer: melhorPergunta.opcoes[index] });
                    proximaRodada();
                }
            });
        } else {
            rl.question('Sua resposta (1 para SIM, 2 para NÃO): ', (respostaUsuario) => {
                let respostaTexto;
                if (respostaUsuario.trim() === '1') respostaTexto = 'SIM';
                else if (respostaUsuario.trim() === '2') respostaTexto = 'NAO';
                else {
                    console.log("\nResposta inválida.");
                    proximaRodada();
                    return;
                }
                historicoDeRespostas.push({ questionId: melhorPergunta.id, answer: respostaTexto });
                proximaRodada();
            });
        }
    }
    proximaRodada();
}

iniciarQuestionarioInterativo();