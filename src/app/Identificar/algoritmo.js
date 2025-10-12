// --- BANCO DE DADOS ATUALIZADO COM BASE NO BRAINSTORM ---

// As 'entidades' são todos os RESULTADOS FINAIS (encaminhamentos) possíveis
export const entidades = [
    // Consumo
    {id: 1, nome: 'O encaminhamento para o seu caso é o PROCON.'},
    {id: 2, nome: 'O encaminhamento para o seu caso é o Juizado Especial Cível (JEC).'},
    {id: 20, nome: 'Recomendamos que primeiro tente contato com a empresa e anote o número de protocolo. Se não resolver, volte aqui.'},
    
    // Conflitos Cíveis/Criminais
    {id: 3, nome: 'O encaminhamento para o seu caso são os Centros Judiciários de Solução de Conflitos e Cidadania (CEJUSCs).'},
    {id: 4, nome: 'O encaminhamento para o seu caso são as Câmaras Privadas de Arbitragem e Mediação.'},
    {id: 5, nome: 'O encaminhamento para o seu caso é o Ministério Público do Estado da Bahia (MP/BA).'},
    {id: 6, nome: 'O encaminhamento para o seu caso é a Contactar um advogado particular da (OAB)'}, 
    {id: 66, nome: 'O encaminhamento para o seu caso é a buscar a Defensoria Pública'}, 

    // Família
    {id: 7, nome: 'ENCAMINHAMENTO IMEDIATO: Busque a Delegacia da Mulher e o Ministério Público. Há urgência e possibilidade de medidas protetivas.'},
    {id: 8, nome: 'O encaminhamento para o seu caso é o Balcão de Justiça na Prefeitura Bairro.'},
    {id: 9, nome: 'O encaminhamento para o seu caso é contratar um Advogado Particular (via OAB).'},
    {id: 10, nome: 'O encaminhamento para o seu caso é a Defensoria Pública.'},
    {id: 78, nome: 'O encaminhamento para o seu caso é a conciliação na Prefeitura-Bairro de forma presencial ou no portal Salvador Digital'}, // Mantido seu acréscimo

    // Trabalhista
    {id: 11, nome: 'O encaminhamento para negociação é o Núcleo Permanente de Incentivo à Autocomposição (NUPIA) do Ministério Público do Trabalho'},
    {id: 12, nome: 'O encaminhamento para o seu caso é a Defensoria Pública da União (DPU) ou o Sindicato da sua categoria.'},
    {id: 13, nome: 'Faça uma denúncia urgente ao Ministério Público do Trabalho (MPT) ou à Superintendência Regional do Trabalho.'},
    {id: 14, nome: 'Faça uma denúncia ao Ministério Público do Trabalho (MPT) e busque orientação no Sindicato da sua categoria.'},
    {id: 15, nome: 'Para tirar dúvidas, procure o Sindicato da sua categoria ou a Superintendência Regional do Trabalho.'},

    // Outros
    {id: 16, nome: 'Para problemas com Plano de Saúde, o caminho é registrar uma reclamação na Agência Nacional de Saúde Suplementar (ANS).'},
    {id: 17, nome: 'Para negativas do INSS, o caminho é entrar com uma ação na Justiça Federal.'},
    {id: 18, nome: 'Você precisa aguardar a decisão oficial ou entrar com um recurso administrativo no próprio INSS.'},
    {id: 19, nome: 'Se o PROCON não resolveu, registre uma reclamação no Banco Central e procure a mediação na câmara da OAB.'},
    {id: 21, nome: 'Primeiro, contate o atendimento ao cliente do seu banco e anote o protocolo.'},
    {id: 99, nome: 'Não foi possível determinar um encaminhamento específico com as informações fornecidas. Recomendamos que você procure a Defensoria Pública para uma orientação detalhada sobre o seu caso.'}
];

// Todas as perguntas, incluindo as aninhadas, com seus PRÉ-REQUISITOS
export const perguntas = [
    // --- Perguntas Iniciais (Nível 1) ---
    {id: 101, texto: 'O problema é sobre um produto ou serviço que comprei ou contratei?', preRequisito: null},
    {id: 102, texto: 'Envolve uma briga ou conflito com um vizinho, familiar ou outra pessoa?', preRequisito: null},
    {id: 103, texto: 'São problemas de família (divórcio, pensão, guarda, etc)?', preRequisito: null},
    {id: 104, texto: 'É uma questão do meu trabalho, com meu patrão ou empregado?', preRequisito: null},
    {id: 105, texto: 'É sobre outro assunto (herança, imóvel, governo, saúde, INSS, etc)?', preRequisito: null},

    // --- Ramo Consumo (sem alterações) ---
    {id: 201, texto: 'Você já tentou resolver diretamente com a empresa/lugar onde comprou?', preRequisito: { perguntaId: 101, resposta: 'SIM' }},
    {id: 202, texto: 'O que aconteceu após tentar resolver com a empresa?', preRequisito: { perguntaId: 201, resposta: 'SIM' }, opcoes: ["Não resolveram ou não responderam.", "Fizeram um acordo mas não cumpriram."]},

    // --- Ramo Conflitos ---
    {id: 301, texto: 'Houve agressão física, ameaça ou algum crime?', preRequisito: { perguntaId: 102, resposta: 'SIM' }},
    {id: 302, texto: 'O conflito envolveu um dano material (perda de dinheiro ou objeto)?', preRequisito: { perguntaId: 301, resposta: 'NAO' }},
    {id: 303, texto: 'A perda material foi de alto valor (acima de R$ 56.480,00)?', preRequisito: { perguntaId: 302, resposta: 'SIM' }},
    {id: 304, texto: 'O conflito envolveu um dano não material, como ofensa à honra, imagem ou um acordo verbal que foi quebrado?', preRequisito: { perguntaId: 302, resposta: 'NAO' }},
    {id: 305, texto: 'Você pode pagar por um advogado particular para resolver essa questão?', preRequisito: { perguntaId: 304, resposta: 'SIM'}},

    // --- Ramo Família ---
    {id: 401, texto: 'Qual o tipo de problema familiar?', preRequisito: { perguntaId: 103, resposta: 'SIM' }, opcoes: ["Pensão, guarda, visitas ou divórcio.", "Violência doméstica."]},
    {id: 402, texto: 'Há um acordo (consenso) entre as pessoas envolvidas?', preRequisito: { perguntaId: 401, resposta: 'Pensão, guarda, visitas ou divórcio.' }},
    {id: 403, texto: 'Antes de um processo, vocês estariam abertos a tentar uma conciliação com um mediador?', preRequisito: { perguntaId: 402, resposta: 'NAO' }},
    
    // --- Ramo Trabalhista (sem alterações) ---
    {id: 501, texto: 'Seu problema trabalhista é sobre o quê?', preRequisito: { perguntaId: 104, resposta: 'SIM' }, opcoes: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho.", "Condições de trabalho ruins (assédio, insegurança).", "Dúvidas sobre contrato ou direitos."]},
    {id: 502, texto: 'Você possui/possuía carteira de trabalho assinada?', preRequisito: { perguntaId: 501, resposta: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."] }},
    {id: 503, texto: 'As pessoas envolvidas desejam negociar para chegar a um acordo?', preRequisito: { perguntaId: 502, resposta: 'SIM' }},
    {id: 506, texto: 'As pessoas envolvidas desejam negociar para chegar a um acordo?', preRequisito: { perguntaId: 502, resposta: 'NAO' }},
    {id: 504, texto: 'Você pode pagar por um advogado?', preRequisito: { perguntaId: 503, resposta: 'NAO' }},
    {id: 505, texto: 'A irregularidade coloca a vida de trabalhadores em risco imediato?', preRequisito: { perguntaId: 501, resposta: 'Condições de trabalho ruins (assédio, insegurança).' }},
    
    
    // --- Ramo Outros (Expandido) ---
    {id: 601, texto: 'Seu problema se encaixa em qual destas categorias?', preRequisito: { perguntaId: 105, resposta: 'SIM' }, opcoes: ["Herança ou inventário de pessoa falecida", "Propriedade ou posse de imóvel/bem", "Saúde (SUS ou plano)", "Previdência (INSS)", "Banco ou Cartão de Crédito"]},
    // Sub-ramo Saúde/INSS/Banco (antigo)
    {id: 602, texto: 'O problema é com o SUS ou com um Plano de Saúde?', preRequisito: { perguntaId: 601, resposta: 'Saúde (SUS ou plano)' }},
    {id: 603, texto: 'O INSS já deu uma resposta oficial negando seu pedido?', preRequisito: { perguntaId: 601, resposta: 'Previdência (INSS)' }},
    {id: 604, texto: 'Você já fez uma reclamação inicial no banco?', preRequisito: { perguntaId: 601, resposta: 'Banco ou Cartão de Crédito' }},
    {id: 605, texto: 'Após reclamar no banco, você foi ao PROCON e o problema foi resolvido?', preRequisito: { perguntaId: 604, resposta: 'SIM' }},
    // Sub-ramo Sucessões (Herança)
    {id: 701, texto: 'A pessoa falecida deixou um testamento?', preRequisito: { perguntaId: 601, resposta: 'Herança ou inventário de pessoa falecida'}},
    {id: 702, texto: 'Há acordo entre todos os herdeiros sobre a divisão dos bens?', preRequisito: { perguntaId: 701, resposta: ['SIM', 'NAO']}},
    // Sub-ramo Coisas (Propriedade/Posse)
    {id: 801, texto: 'O problema é sobre a posse ou propriedade de um imóvel (casa, terreno)?', preRequisito: { perguntaId: 601, resposta: 'Propriedade ou posse de imóvel/bem'}},
    {id: 802, texto: 'A questão envolve o direito de uso de um bem que não é seu (ex: usufruto, servidão de passagem)?', preRequisito: { perguntaId: 801, resposta: 'NAO'}}
];

export const respostas = [];
const todasAsPerguntasIniciais = [101, 102, 103, 104, 105];

function popularRespostas(entidadeId, caminho) {
    for (const [perguntaId, resposta] of Object.entries(caminho)) {
        respostas.push({ entidade_id: entidadeId, pergunta_id: parseInt(perguntaId), resposta });
    }
    const perguntaInicialDoCaminho = todasAsPerguntasIniciais.find(id => caminho[id]);
    todasAsPerguntasIniciais.forEach(id => {
        if (id !== perguntaInicialDoCaminho) {
            if (!respostas.some(r => r.entidade_id === entidadeId && r.pergunta_id === id)) {
                 respostas.push({ entidade_id: entidadeId, pergunta_id: id, resposta: 'NAO' });
            }
        }
    });
}
// Objeto de caminhos atualizado com a nova lógica
const caminhos = {
    // Ramo Consumo
    1: { 101: 'SIM', 201: 'SIM', 202: 'Não resolveram ou não responderam.' },
    2: { 101: 'SIM', 201: 'SIM', 202: 'Fizeram um acordo mas não cumpriram.' },
    20: { 101: 'SIM', 201: 'NAO' },
    // Ramo Conflitos
    3: { 102: 'SIM', 301: 'NAO', 302: 'SIM', 303: 'SIM' }, // Conflito com dano material alto -> CEJUSC
    4: { 102: 'SIM', 301: 'NAO', 302: 'SIM', 303: 'NAO' }, // Conflito com dano material baixo -> Câmaras Privadas
    5: { 102: 'SIM', 301: 'SIM' }, // Conflito com crime -> MP/BA
    6: { 102: 'SIM', 301: 'NAO', 302: 'NAO', 304: 'SIM', 305: 'SIM' }, // Dano não material, pode pagar adv -> Advogado
    25: { 102: 'SIM', 301: 'NAO', 302: 'NAO', 304: 'SIM', 305: 'NAO' }, // Dano não material, não pode pagar adv -> Defensoria
    // Ramo Família
    7: { 103: 'SIM', 401: 'Violência doméstica.' },
    8: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'SIM' },
    26: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NAO', 403: 'SIM' }, // Sem acordo, mas aceita conciliação -> Prefeitura Bairro
    9: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NAO', 403: 'NAO' }, // Sem acordo, sem conciliação -> Advogado / Defensoria (genérico, pode ser melhorado)
    10: { 103: 'SIM', 401: 'Pensão, guarda, visitas ou divórcio.', 402: 'NAO', 403: 'NAO' }, // Duplicado para Defensoria
    // Ramo Trabalhista
    11: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'SIM' },
    12: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'NAO', 504: 'NAO' },
    13: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'SIM' },
    14: { 104: 'SIM', 501: 'Condições de trabalho ruins (assédio, insegurança).', 505: 'NAO' },
    15: { 104: 'SIM', 501: 'Dúvidas sobre contrato ou direitos.' },
     9: { 104: 'SIM', 501: ["Direitos não pagos (salário, férias, etc).", "Acidente ou doença do trabalho."], 502: ['SIM', 'NAO'], 503: 'NAO', 504: 'SIM' },
    // Ramo Outros
    16: { 105: 'SIM', 601: 'Saúde (SUS ou plano)', 602: 'Plano de Saúde' },
    17: { 105: 'SIM', 601: 'Previdência (INSS)', 603: 'SIM' },
    18: { 105: 'SIM', 601: 'Previdência (INSS)', 603: 'NAO' },
    19: { 105: 'SIM', 601: 'Banco ou Cartão de Crédito', 604: 'SIM', 605: 'NAO'},
    21: { 105: 'SIM', 601: 'Banco ou Cartão de Crédito', 604: 'NAO' },
    // Novos Caminhos (Sucessões e Coisas)
    9: { 105: 'SIM', 601: 'Herança ou inventário de pessoa falecida', 701: ['SIM', 'NAO'], 702: 'NAO' }, // Herança sem acordo -> Advogado / Defensoria
    10: { 105: 'SIM', 601: 'Herança ou inventário de pessoa falecida', 701: ['SIM', 'NAO'], 702: 'NAO' }, // Herança sem acordo -> Defensoria
    9: { 105: 'SIM', 601: 'Propriedade ou posse de imóvel/bem', 801: 'SIM' }, // Problema de Propriedade de Imóvel -> Advogado / Defensoria
    10: { 105: 'SIM', 601: 'Propriedade ou posse de imóvel/bem', 801: 'SIM' }, // Problema de Propriedade de Imóvel -> Defensoria
};
for (const [entidadeId, caminho] of Object.entries(caminhos)) { popularRespostas(parseInt(entidadeId), caminho); }

// --- ALGORITMOS (Estrutura Mantida, sem alterações) ---

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
        const bonusAcerto = 2.0;
        const penalidadeErro = 100.0;

        for (const passo of historicoDeRespostas) {

            if(passo.answer === "NAO_SEI"){
                continue;
            }

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