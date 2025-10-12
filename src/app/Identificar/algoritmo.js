// =============================================================================
// --- BANCO DE DADOS ORGANIZADO E CONSOLIDADO ---
// =============================================================================

/**
 * ENTIDADES: Representam todos os resultados finais (encaminhamentos) possíveis.
 * Foram consolidadas para remover duplicatas e agrupar por tema.
 */
export const entidades = [
    // Ramo: Consumo
    {id: 1, nome: 'O encaminhamento para o seu caso é o PROCON.'},
    {id: 2, nome: 'O encaminhamento para o seu caso é o Juizado Especial Cível (JEC).'},
    {id: 20, nome: 'Recomendamos que primeiro tente contato com a empresa e anote o número de protocolo. Se não resolver, volte aqui.'},

    // Ramo: Conflitos Cíveis
    {id: 3, nome: 'O encaminhamento para o seu caso são os Centros Judiciários de Solução de Conflitos e Cidadania (CEJUSCs).'},
    {id: 4, nome: 'O encaminhamento para o seu caso são as Câmaras Privadas de Arbitragem e Mediação.'},
    {id: 5, nome: 'O encaminhamento para o seu caso é o Ministério Público do Estado da Bahia (MP/BA).'},

    // Ramo: Família
    {id: 7, nome: 'ENCAMINHAMENTO IMEDIATO: Busque a Delegacia da Mulher e o Ministério Público. Há urgência e possibilidade de medidas protetivas.'},
    {id: 8, nome: 'O encaminhamento para o seu caso é o Balcão de Justiça na Prefeitura Bairro.'},
    {id: 78, nome: 'O encaminhamento para o seu caso é a conciliação na Prefeitura-Bairro de forma presencial ou no portal Salvador Digital.'},

    // Ramo: Trabalhista
    {id: 11, nome: 'O encaminhamento para negociação é o Núcleo Permanente de Incentivo à Autocomposição (NUPIA) do Ministério Público do Trabalho.'},
    {id: 12, nome: 'O encaminhamento para o seu caso é a Defensoria Pública da União (DPU) ou o Sindicato da sua categoria.'},
    {id: 13, nome: 'Faça uma denúncia urgente ao Ministério Público do Trabalho (MPT) ou à Superintendência Regional do Trabalho.'},
    {id: 14, nome: 'Faça uma denúncia ao Ministério Público do Trabalho (MPT) e busque orientação no Sindicato da sua categoria.'},
    {id: 15, nome: 'Para tirar dúvidas, procure o Sindicato da sua categoria ou a Superintendência Regional do Trabalho.'},

    // Ramo: Saúde
    {id: 16, nome: 'Para problemas com Plano de Saúde, registre uma reclamação na Agência Nacional de Saúde Suplementar (ANS), preferencialmente pela NIP (Notificação de Intermediação Preliminar).'},
    {id: 22, nome: 'Para problemas com o SUS, o encaminhamento é o Ministério Público ou a Defensoria Pública.'},
    {id: 23, nome: 'Como primeiro passo, procure a Ouvidoria do SUS e o conselho de saúde do seu município. Isso pode resolver mais rápido.'},
    {id: 25, nome: 'Primeiro, ligue para a operadora do seu plano de saúde e anote o protocolo. Se não resolver, o próximo passo é a ANS.'},

    // Ramo: Previdência (INSS)
    {id: 18, nome: 'Você precisa aguardar a decisão oficial ou entrar com um recurso administrativo no próprio INSS, por meio do Conselho de Recursos da Previdência Social.'},
    {id: 35, nome: 'O encaminhamento é a Defensoria Pública da União (DPU) ou o Juizado Especial Federal (para causas de até 60 salários mínimos).'},

    // Ramo: Bancos
    {id: 19, nome: 'Se o PROCON não resolveu, registre uma reclamação no Banco Central e procure a mediação na Câmara da OAB.'},
    {id: 21, nome: 'Primeiro, contate o atendimento ao cliente do seu banco e anote o protocolo.'},

    // Ramo: Serviços Públicos e Governo
    {id: 29, nome: 'Acesse os órgãos de trânsito como JARI e CETRAN. Em caso de valores muito altos, busque o Juizado Especial.'},
    {id: 30, nome: 'Envie um requerimento no site da banca examinadora do concurso ou ligue para o SAC da organizadora.'},

    // Encaminhamentos Gerais (Advogado/Defensoria)
    {id: 9, nome: 'O encaminhamento para o seu caso é contratar um Advogado Particular (via OAB).'},
    {id: 10, nome: 'O encaminhamento para o seu caso é a Defensoria Pública.'},

    // Genérico / Fallback
    {id: 99, nome: 'Não foi possível determinar um encaminhamento específico. Recomendamos que procure a Defensoria Pública para uma orientação detalhada.'}
];


/**
 * PERGUNTAS: Todas as perguntas que o sistema pode fazer.
 * Foram revisadas para garantir clareza, remover itens que não eram perguntas
 * e corrigir pré-requisitos.
 */
export const perguntas = [
    // --- Perguntas Iniciais (Nível 1) ---
    {id: 101, texto: 'O problema é sobre um produto ou serviço que comprei ou contratei?', preRequisito: null},
    {id: 102, texto: 'Envolve uma briga ou conflito com um vizinho, familiar ou outra pessoa?', preRequisito: null},
    {id: 103, texto: 'São problemas de família (divórcio, pensão, guarda, etc)?', preRequisito: null},
    {id: 104, texto: 'É uma questão do meu trabalho, com meu patrão ou empregado?', preRequisito: null},
    {id: 105, texto: 'É sobre outro assunto (governo, saúde, INSS, banco, etc)?', preRequisito: null},

    // --- Ramo Consumo ---
    {id: 201, texto: 'Você já tentou resolver diretamente com a empresa/lugar onde comprou?', preRequisito: { perguntaId: 101, resposta: 'SIM' }},
    {id: 202, texto: 'O que aconteceu após tentar resolver com a empresa?', preRequisito: { perguntaId: 201, resposta: 'SIM' }},
    {id: 203, texto: 'Não resolveram ou não responderam?', preRequisito : {perguntaId : 201, resposta: 'SIM'}},

    // --- Ramo Conflitos ---
    {id: 301, texto: 'Houve agressão física, ameaça ou algum crime?', preRequisito: { perguntaId: 102, resposta: 'SIM' }},
    {id: 302, texto: 'O conflito envolveu um dano material (perda de dinheiro ou objeto)?', preRequisito: { perguntaId: 301, resposta: 'NÃO' }},
    {id: 303, texto: 'A perda material foi de alto valor (acima de R$ 56.480,00)?', preRequisito: { perguntaId: 302, resposta: 'SIM' }},
    {id: 304, texto: 'O conflito envolveu um dano não material, como ofensa à honra, imagem ou um acordo verbal que foi quebrado?', preRequisito: { perguntaId: 302, resposta: 'NÃO' }},
    {id: 305, texto: 'Você pode pagar por um advogado particular para resolver essa questão?', preRequisito: { perguntaId: 304, resposta: 'SIM'}},

    // --- Ramo Família ---
    {id: 401, texto: 'Qual o tipo de problema familiar?', preRequisito: { perguntaId: 103, resposta: 'SIM' }, opcoes: ["Pensão, guarda, visitas ou divórcio.", "Violência doméstica."]},
    {id: 402, texto: 'Há um acordo (consenso) entre as pessoas envolvidas?', preRequisito: { perguntaId: 401, resposta: 'Pensão, guarda, visitas ou divórcio.' }},
    {id: 403, texto: 'Antes de um processo, vocês estariam abertos a tentar uma conciliação com um mediador?', preRequisito: { perguntaId: 402, resposta: 'NÃO' }},
    {id: 404, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 403, resposta: 'NÃO' }},

    // --- Ramo Trabalhista ---
    {id: 501, texto: 'Seu problema trabalhista é sobre o quê?', preRequisito: { perguntaId: 104, resposta: 'SIM' }, opcoes: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho.", "Condições de trabalho ruins (assédio, insegurança).", "Dúvidas sobre contrato ou direitos."]},
    {id: 502, texto: 'Você possui/possuía carteira de trabalho assinada?', preRequisito: { perguntaId: 501, resposta: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."] }},
    {id: 503, texto: 'As pessoas envolvidas desejam negociar para chegar a um acordo?', preRequisito: { perguntaId: 502, resposta: ['SIM', 'NÃO'] }},
    {id: 504, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 503, resposta: 'NÃO' }},
    {id: 505, texto: 'A irregularidade coloca a vida de trabalhadores em risco imediato?', preRequisito: { perguntaId: 501, resposta: 'Condições de trabalho ruins (assédio, insegurança).' }},

    // --- Ramo Outros ---
    {id: 601, texto: 'Seu problema se encaixa em qual categoria?', preRequisito: { perguntaId: 105, resposta: 'SIM' }, opcoes: ["Problema com o governo ou serviço público (concurso, multas, IPTU, etc).","Questões de saúde (SUS ou plano de saúde).","Previdência (INSS: aposentadoria, auxílios).", "Problemas com Banco ou Cartão de Crédito.", "Nenhuma dessas opções."]},

    // Sub-ramo: Governo/Serviço Público
    {id: 606, texto: 'Seu problema é relacionado a um concurso público?', preRequisito: {perguntaId: 601, resposta: 'Problema com o governo ou serviço público (concurso, multas, IPTU, etc).'}},
    {id: 608, texto: 'Seu problema está relacionado com multas de trânsito?', preRequisito: {perguntaId: 606, resposta: 'NÃO'}},
    
    // Sub-ramo: Saúde
    {id: 621, texto: 'O problema é com o SUS ou com um Plano de Saúde?', preRequisito: { perguntaId: 601, resposta: 'Questões de saúde (SUS ou plano de saúde).' }, opcoes: ["SUS", "Plano de Saúde"]},
    {id: 622, texto: 'Você já tentou a Ouvidoria do SUS ou a Secretaria de Saúde?', preRequisito: { perguntaId: 621, resposta: 'SUS' }},
    {id: 624, texto: 'Você já ligou para a operadora do plano e tem um número de protocolo?', preRequisito: { perguntaId: 621, resposta: 'Plano de Saúde' }},

    // Sub-ramo: Previdência (INSS)
    {id: 603, texto: 'O INSS já deu uma resposta oficial (negando ou concedendo) seu pedido?', preRequisito: { perguntaId: 601, resposta: 'Previdência (INSS: aposentadoria, auxílios).' }},
    {id: 625, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 603, resposta: 'SIM' }},

    // Sub-ramo: Bancos
    {id: 604, texto: 'Você já fez uma reclamação inicial no seu banco e anotou o protocolo?', preRequisito: { perguntaId: 601, resposta: 'Problemas com Banco ou Cartão de Crédito.' }},
    {id: 627, texto: 'Após reclamar no banco, você já buscou o PROCON?', preRequisito: { perguntaId: 604, resposta: 'SIM' }},
];


/**
 * BASE DE CONHECIMENTO (RESPOSTAS): Estrutura que relaciona cada entidade a cada pergunta.
 * É populada dinamicamente a partir dos `caminhos` definidos abaixo.
 */
export const respostas = [];
const todasAsPerguntasIniciais = [101, 102, 103, 104, 105];

function popularRespostas(entidadeId, caminho) {
    for (const [perguntaId, resposta] of Object.entries(caminho)) {
        if (!respostas.some(r => r.entidade_id === entidadeId && r.pergunta_id === parseInt(perguntaId))) {
            respostas.push({ entidade_id: entidadeId, pergunta_id: parseInt(perguntaId), resposta });
        }
    }
    const perguntaInicialDoCaminho = todasAsPerguntasIniciais.find(id => caminho[id]);
    todasAsPerguntasIniciais.forEach(id => {
        if (id !== perguntaInicialDoCaminho) {
            if (!respostas.some(r => r.entidade_id === entidadeId && r.pergunta_id === id)) {
                 respostas.push({ entidade_id: entidadeId, pergunta_id: id, resposta: 'NÃO' });
            }
        }
    });
}

/**
 * CAMINHOS: Mapeia uma sequência de respostas a um encaminhamento (entidade) específico.
 * Esta seção foi completamente reconstruída para usar os dados limpos e a lógica corrigida.
 */
const caminhos = {
    // Ramo Consumo
    1: { 101: 'SIM', 201: 'SIM', 203: 'NÃO'},
    2: { 101: 'SIM', 201: 'SIM', 203: 'SIM'},
    20: { 101: 'SIM', 201: 'NÃO' },

    // Ramo Conflitos
    3: { 102: 'SIM', 301: 'NÃO', 302: 'SIM', 303: 'SIM' },
    4: { 102: 'SIM', 301: 'NÃO', 302: 'SIM', 303: 'NÃO' },
    5: { 102: 'SIM', 301: 'SIM' },

    // Ramo Família
    7: { 103: 'SIM', 401: 'Violência doméstica.' },
    8: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'SIM' },
    78: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NÃO', 403: 'SIM'},

    // Ramo Trabalhista
    11: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NÃO'], 503: 'SIM' },
    13: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'SIM' },
    14: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'NÃO' },
    15: { 104: 'SIM', 501: 'Dúvidas sobre contrato ou direitos.' },

    // Ramo Outros > Saúde
    16: { 105: 'SIM', 601: 'Questões de saúde (SUS ou plano de saúde).', 621: 'Plano de Saúde', 624: 'SIM' },
    22: { 105: 'SIM', 601: 'Questões de saúde (SUS ou plano de saúde).', 621: 'SUS', 622: 'SIM' },
    23: { 105: 'SIM', 601: 'Questões de saúde (SUS ou plano de saúde).', 621: 'SUS', 622: 'NÃO' },
    25: { 105: 'SIM', 601: 'Questões de saúde (SUS ou plano de saúde).', 621: 'Plano de Saúde', 624: 'NÃO' },

    // Ramo Outros > Previdência (INSS)
    18: { 105: 'SIM', 601: 'Previdência (INSS: aposentadoria, auxílios).', 603: 'NÃO' },
    
    // Ramo Outros > Bancos
    19: { 105: 'SIM', 601: 'Problemas com Banco ou Cartão de Crédito.', 604: 'SIM', 627: 'NÃO' },
    1: { 105: 'SIM', 601: 'Problemas com Banco ou Cartão de Crédito.', 604: 'SIM', 627: 'SIM' }, // Se o usuário já foi ao PROCON, a recomendação pode ser a mesma.
    21: { 105: 'SIM', 601: 'Problemas com Banco ou Cartão de Crédito.', 604: 'NÃO' },

    // Ramo Outros > Governo
    29: { 105: 'SIM', 601: 'Problema com o governo ou serviço público (concurso, multas, IPTU, etc).', 606: 'NÃO', 608: 'SIM' },
    30: { 105: 'SIM', 601: 'Problema com o governo ou serviço público (concurso, multas, IPTU, etc).', 606: 'SIM' },
    
    // Ramo Outros > Genérico / Fallback
    99: { 105: 'SIM', 601: 'Nenhuma dessas opções.' },
};
// Populando os caminhos principais
for (const [entidadeId, caminho] of Object.entries(caminhos)) { popularRespostas(parseInt(entidadeId), caminho); }

// Populando os múltiplos caminhos que levam aos resultados 9 (Advogado) e 10 (Defensoria)
popularRespostas(9, { 102: 'SIM', 301: 'NÃO', 302: 'NÃO', 304: 'SIM', 305: 'SIM' }); // Conflito
popularRespostas(9, { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NÃO', 403: 'NÃO', 404: 'SIM' }); // Família
popularRespostas(9, { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NÃO'], 503: 'NÃO', 504: 'SIM' }); // Trabalhista
popularRespostas(9, { 105: 'SIM', 601: 'Previdência (INSS: aposentadoria, auxílios).', 603: 'SIM', 625: 'SIM' }); // INSS

popularRespostas(10, { 102: 'SIM', 301: 'NÃO', 302: 'NÃO', 304: 'SIM', 305: 'NÃO' }); // Conflito
popularRespostas(10, { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NÃO', 403: 'NÃO', 404: 'NÃO' }); // Família
popularRespostas(12, { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NÃO'], 503: 'NÃO', 504: 'NÃO' }); // DPU via Trabalhista
popularRespostas(35, { 105: 'SIM', 601: 'Previdência (INSS: aposentadoria, auxílios).', 603: 'SIM', 625: 'NÃO' }); // DPU via INSS


// =============================================================================
// --- ALGORITMOS (Estrutura Mantida) ---
// =============================================================================

export function escolherMelhorPergunta(candidatosAtuais, perguntasJaFeitas, todasAsPerguntas, todasAsRespostas, historicoDeRespostas){
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
export function calcularPesosDasEntidades(historicoDeRespostas, todasAsEntidades, todasAsRespostas) {
    let entidadesComPeso = todasAsEntidades.map(e => ({ ...e, peso: 1.0 }));
    for (const entidade of entidadesComPeso) {
        let pesoAtual = 1.0;
        const bonusAcerto = 2.0, penalidadeErro = 100.0;
        for (const passo of historicoDeRespostas) {
            if(passo.answer === "NAO_SEI") continue;
            const respostaDaEntidadeParaPergunta = todasAsRespostas.find(r => r.entidade_id === entidade.id && r.pergunta_id === passo.questionId);
            if (respostaDaEntidadeParaPergunta) {
                const respostaEntidade = respostaDaEntidadeParaPergunta.resposta;
                const respostaUsuario = passo.answer;
                const corresponde = Array.isArray(respostaEntidade) ? respostaEntidade.includes(respostaUsuario) : respostaEntidade === respostaUsuario;
                if (corresponde) pesoAtual *= bonusAcerto;
                else pesoAtual /= penalidadeErro;
            } else { pesoAtual /= 2; }
        }
        entidade.peso = pesoAtual;
    }
    const somaDosPesos = entidadesComPeso.reduce((sum, e) => sum + e.peso, 0);
    if (somaDosPesos > 0) {
        entidadesComPeso = entidadesComPeso.map(e => ({ ...e, peso: e.peso / somaDosPesos }));
    }
    return entidadesComPeso.sort((a, b) => b.peso - a.peso);
}