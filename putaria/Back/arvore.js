// 1. Módulo necessário para ler a entrada do usuário no terminal
const readline = require('readline');

// --- SUA ÁRVORE DE DECISÃO (INTACTA) ---
const arvoreDeDecisao = {
    // Ponto de partida
    "inicio": {
        id: "inicio",
        tipo: "pergunta",
        texto: "Qual o assunto principal do seu problema?",
        respostas: [
            { texto: "Um produto ou serviço que comprei ou contratei.", proximo_passo_id: "q_consumo_inicio" },
            { texto: "Uma briga ou conflito com um vizinho, familiar ou outra pessoa.", proximo_passo_id: "q_conflito_dialogo" },
            { texto: "Problemas de família (pensão, divórcio, guarda).", proximo_passo_id: "q_familia_tipo" },
            { texto: "Uma questão do meu trabalho (patrão ou empregado).", proximo_passo_id: "q_trabalho_tipo" },
            { texto: "Outro assunto (problema com governo, saúde, INSS, etc.).", proximo_passo_id: "q_outros_tipo" }
        ]
    },
    // ... (O RESTANTE DA SUA ÁRVORE DE DECISÃO VAI AQUI, EXATAMENTE COMO VOCÊ COLOCOU) ...
    // --- RAMO DE CONSUMO ---
    "q_consumo_inicio": {
        id: "q_consumo_inicio",
        tipo: "pergunta",
        texto: "Você já tentou resolver diretamente com a empresa/lugar onde comprou?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "q_consumo_o_que_aconteceu" },
            { texto: "Não", proximo_passo_id: "r_consumo_tentar_contato" }
        ]
    },
    "q_consumo_o_que_aconteceu": {
        id: "q_consumo_o_que_aconteceu",
        tipo: "pergunta",
        texto: "O que aconteceu?",
        respostas: [
            { texto: "Não resolveram ou não responderam.", proximo_passo_id: "r_procon" },
            { texto: "Fizeram um acordo ou prometeram algo, mas não cumpriram.", proximo_passo_id: "r_jec" }
        ]
    },
    "r_consumo_tentar_contato": {
        id: "r_consumo_tentar_contato",
        tipo: "resultado",
        texto: "Recomendamos que primeiro tente contato com a empresa e anote o número de protocolo. Se não resolver, o encaminhamento é para o PROCON."
    },

    // --- RAMO DE CONFLITOS CÍVEIS/CRIMINAIS ---
    "q_conflito_dialogo": {
        id: "q_conflito_dialogo",
        tipo: "pergunta",
        texto: "Existe alguma proposta de diálogo/acordo entre as pessoas envolvidas?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "q_conflito_perda_material" },
            { texto: "Não", proximo_passo_id: "q_conflito_agressao" }
        ]
    },
    "q_conflito_perda_material": {
        id: "q_conflito_perda_material",
        tipo: "pergunta",
        texto: "A causa envolveu uma perda material muito grande (ex: casa ou carro, acima de R$ 56.480,00)?",
        respostas: [
            { texto: "Sim, o valor é maior.", proximo_passo_id: "r_cejusc" },
            { texto: "Não, o valor é menor.", proximo_passo_id: "r_camaras_privadas" }
        ]
    },
    "q_conflito_agressao": {
        id: "q_conflito_agressao",
        tipo: "pergunta",
        texto: "Houve agressão física, ameaça ou algum crime?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_mpba" },
            { texto: "Não", proximo_passo_id: "r_mediacao_oab" }
        ]
    },

    // --- RAMO DE FAMÍLIA ---
    "q_familia_tipo": {
        id: "q_familia_tipo",
        tipo: "pergunta",
        texto: "Qual o tipo de problema familiar?",
        respostas: [
            { texto: "Pensão, guarda, visitas ou divórcio.", proximo_passo_id: "q_familia_acordo" },
            { texto: "Violência doméstica.", proximo_passo_id: "r_delegacia_mulher" }
        ]
    },
    "q_familia_acordo": {
        id: "q_familia_acordo",
        tipo: "pergunta",
        texto: "Há acordo (consenso) entre as pessoas envolvidas?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_prefeitura_bairro" },
            { texto: "Não", proximo_passo_id: "q_familia_pode_pagar_adv" }
        ]
    },
    "q_familia_pode_pagar_adv": {
        id: "q_familia_pode_pagar_adv",
        tipo: "pergunta",
        texto: "Você pode pagar por um advogado?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_advogado_particular" },
            { texto: "Não", proximo_passo_id: "r_defensoria_publica" }
        ]
    },

    // --- RAMO TRABALHISTA ---
    "q_trabalho_tipo": {
        id: "q_trabalho_tipo",
        tipo: "pergunta",
        texto: "Seu problema trabalhista é sobre o quê?",
        respostas: [
            { texto: "Direitos não pagos (salário, férias, FGTS, etc.).", proximo_passo_id: "q_trabalho_carteira_assinada" },
            { texto: "Acidente de trabalho ou doença causada pelo trabalho.", proximo_passo_id: "q_trabalho_carteira_assinada" },
            { texto: "Condições de trabalho ruins (assédio, falta de segurança).", proximo_passo_id: "q_trabalho_risco_vida" },
            { texto: "Dúvidas sobre contrato ou direitos.", proximo_passo_id: "r_sindicato_srt" }
        ]
    },
    "q_trabalho_carteira_assinada": {
        id: "q_trabalho_carteira_assinada",
        tipo: "pergunta",
        texto: "Você possui/possuía carteira de trabalho assinada?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "q_trabalho_consenso" },
            { texto: "Não (trabalho informal)", proximo_passo_id: "q_trabalho_consenso" }
        ]
    },
     "q_trabalho_consenso": {
        id: "q_trabalho_consenso",
        tipo: "pergunta",
        texto: "As pessoas envolvidas desejam negociar/conversar para chegar a um acordo?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_mpt_nupia" },
            { texto: "Não", proximo_passo_id: "q_trabalho_pode_pagar_adv" }
        ]
    },
    "q_trabalho_pode_pagar_adv": {
        id: "q_trabalho_pode_pagar_adv",
        tipo: "pergunta",
        texto: "Você pode pagar por um advogado?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_advogado_particular" },
            { texto: "Não", proximo_passo_id: "r_dpu" }
        ]
    },
    "q_trabalho_risco_vida": {
        id: "q_trabalho_risco_vida",
        tipo: "pergunta",
        texto: "A irregularidade está acontecendo agora e coloca a vida de trabalhadores em risco?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_mpt_denuncia_urgente" },
            { texto: "Não", proximo_passo_id: "r_mpt_sindicato" }
        ]
    },

    // --- RAMO OUTROS ASSUNTOS ---
    "q_outros_tipo": {
        id: "q_outros_tipo",
        tipo: "pergunta",
        texto: "Seu problema se encaixa em qual categoria?",
        respostas: [
            { texto: "Problema com o governo ou serviço público (IPTU, multas, concurso).", proximo_passo_id: "r_adv_ou_defensoria_complexo" },
            { texto: "Questões de saúde (SUS ou plano).", proximo_passo_id: "q_saude_tipo" },
            { texto: "Previdência e benefícios (INSS).", proximo_passo_id: "q_inss_negativa" },
            { texto: "Questões de moradia e imóvel (aluguel, posse).", proximo_passo_id: "q_imovel_tipo" },
            { texto: "Problemas com Banco ou Cartão de Crédito.", proximo_passo_id: "q_banco_reclamacao_inicial" },
            { texto: "Nenhuma dessas opções.", proximo_passo_id: "r_defensoria_geral" }
        ]
    },
    // Sub-ramos de Outros...
    "q_saude_tipo": {
        id: "q_saude_tipo",
        tipo: "pergunta",
        texto: "O problema é com o SUS ou com um Plano de Saúde?",
        respostas: [
            { texto: "SUS", proximo_passo_id: "r_mp_ou_defensoria" },
            { texto: "Plano de Saúde", proximo_passo_id: "r_ans" }
        ]
    },
    "q_inss_negativa": {
        id: "q_inss_negativa",
        tipo: "pergunta",
        texto: "O INSS já deu uma resposta oficial negando seu pedido?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "r_justica_federal" },
            { texto: "Não", proximo_passo_id: "r_inss_recurso" }
        ]
    },
    "q_imovel_tipo": {
        id: "q_imovel_tipo",
        tipo: "pergunta",
        texto: "Seu problema é com um contrato de aluguel ou sobre a posse de um terreno/usucapião?",
        respostas: [
            { texto: "Contrato de aluguel", proximo_passo_id: "r_jec" },
            { texto: "Posse de terreno ou usucapião", proximo_passo_id: "r_justica_comum_imovel" }
        ]
    },
     "q_banco_reclamacao_inicial": {
        id: "q_banco_reclamacao_inicial",
        tipo: "pergunta",
        texto: "Você já fez uma reclamação inicial no banco?",
        respostas: [
            { texto: "Sim", proximo_passo_id: "q_banco_procon_resolveu" },
            { texto: "Não", proximo_passo_id: "r_banco_contato_cliente" }
        ]
    },
    "q_banco_procon_resolveu": {
        id: "q_banco_procon_resolveu",
        tipo: "pergunta",
        texto: "Após reclamar no banco, você foi ao PROCON e o problema foi resolvido?",
        respostas: [
            { texto: "Sim, foi resolvido.", proximo_passo_id: "r_fim" },
            { texto: "Não, o PROCON não resolveu.", proximo_passo_id: "r_banco_central_oab" }
        ]
    },

    // --- RESULTADOS / ENCAMINHAMENTOS FINAIS ---
    "r_procon": { id: "r_procon", tipo: "resultado", texto: "O encaminhamento para o seu caso é o PROCON." },
    "r_jec": { id: "r_jec", tipo: "resultado", texto: "O encaminhamento para o seu caso é o Juizado Especial Cível (JEC)." },
    "r_cejusc": { id: "r_cejusc", tipo: "resultado", texto: "O encaminhamento para o seu caso são os Centros Judiciários de Solução de Conflitos e Cidadania (CEJUSCs)." },
    "r_camaras_privadas": { id: "r_camaras_privadas", tipo: "resultado", texto: "O encaminhamento para o seu caso são as Câmaras Privadas de Arbitragem e Mediação." },
    "r_mpba": { id: "r_mpba", tipo: "resultado", texto: "O encaminhamento para o seu caso é o Ministério Público do Estado da Bahia (MP/BA)." },
    "r_mediacao_oab": { id: "r_mediacao_oab", tipo: "resultado", texto: "O encaminhamento para o seu caso é a Câmara de Mediação da OAB-BA." },
    "r_delegacia_mulher": { id: "r_delegacia_mulher", tipo: "resultado", texto: "ENCAMINHAMENTO IMEDIATO: Busque a Delegacia da Mulher e o Ministério Público. Há urgência e possibilidade de medidas protetivas." },
    "r_prefeitura_bairro": { id: "r_prefeitura_bairro", tipo: "resultado", texto: "O encaminhamento para o seu caso é o Balcão de Justiça na Prefeitura Bairro." },
    "r_advogado_particular": { id: "r_advogado_particular", tipo: "resultado", texto: "O encaminhamento para o seu caso é contratar um Advogado Particular (via OAB)." },
    "r_defensoria_publica": { id: "r_defensoria_publica", tipo: "resultado", texto: "O encaminhamento para o seu caso é a Defensoria Pública." },
    "r_mpt_nupia": { id: "r_mpt_nupia", tipo: "resultado", texto: "O encaminhamento para negociação é o Núcleo Permanente de Incentivo à Autocomposição (NUPIA) do Ministério Público do Trabalho." },
    "r_dpu": { id: "r_dpu", tipo: "resultado", texto: "O encaminhamento para o seu caso é a Defensoria Pública da União (DPU) ou o Sindicato da sua categoria." },
    "r_mpt_denuncia_urgente": { id: "r_mpt_denuncia_urgente", tipo: "resultado", texto: "Faça uma denúncia urgente ao Ministério Público do Trabalho (MPT) ou à Superintendência Regional do Trabalho." },
    "r_mpt_sindicato": { id: "r_mpt_sindicato", tipo: "resultado", texto: "Faça uma denúncia ao Ministério Público do Trabalho (MPT) e busque orientação no Sindicato da sua categoria." },
    "r_sindicato_srt": { id: "r_sindicato_srt", tipo: "resultado", texto: "Para tirar dúvidas, procure o Sindicato da sua categoria ou a Superintendência Regional do Trabalho." },
    "r_adv_ou_defensoria_complexo": { id: "r_adv_ou_defensoria_complexo", tipo: "resultado", texto: "Casos contra o governo são complexos. O encaminhamento é a Defensoria Pública ou um Advogado Particular." },
    "r_mp_ou_defensoria": { id: "r_mp_ou_defensoria", tipo: "resultado", texto: "O encaminhamento para problemas com o SUS é o Ministério Público ou a Defensoria Pública." },
    "r_ans": { id: "r_ans", tipo: "resultado", texto: "Para problemas com Plano de Saúde, o caminho é registrar uma reclamação na Agência Nacional de Saúde Suplementar (ANS)." },
    "r_justica_federal": { id: "r_justica_federal", tipo: "resultado", texto: "Para negativas do INSS, o caminho é entrar com uma ação na Justiça Federal." },
    "r_inss_recurso": { id: "r_inss_recurso", tipo: "resultado", texto: "Você precisa aguardar a decisão oficial ou entrar com um recurso administrativo no próprio INSS." },
    "r_justica_comum_imovel": { id: "r_justica_comum_imovel", tipo: "resultado", texto: "Casos de posse de terreno ou usucapião precisam de um processo na Justiça Comum, via Defensoria Pública ou Advogado Particular." },
    "r_banco_contato_cliente": { id: "r_banco_contato_cliente", tipo: "resultado", texto: "Primeiro, contate o atendimento ao cliente do seu banco e anote o protocolo." },
    "r_banco_central_oab": { id: "r_banco_central_oab", tipo: "resultado", texto: "Se o PROCON não resolveu, registre uma reclamação no Banco Central e procure a mediação na câmara da OAB." },
    "r_defensoria_geral": { id: "r_defensoria_geral", tipo: "resultado", texto: "Não conseguimos identificar um órgão específico. Recomendamos que você procure a Defensoria Pública para receber orientação detalhada." },
    "r_fim": { id: "r_fim", tipo: "resultado", texto: "Ficamos felizes que seu problema foi resolvido!" }
};

// --- NOVO MOTOR INTERATIVO ---

// 2. Configurar a interface para ler e escrever no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Função principal que guia o questionário interativo.
 * Ela se chama recursivamente para lidar com a natureza assíncrona da entrada do usuário.
 * @param {string} passoId - O ID do passo atual na árvore de decisão.
 */
function fazerPergunta(passoId) {
    const passoAtual = arvoreDeDecisao[passoId];

    // Verifica se chegamos a um resultado final
    if (!passoAtual || passoAtual.tipo === 'resultado') {
        console.log('\n--- FIM DO QUESTIONÁRIO ---');
        if (passoAtual) {
            console.log(`✅ Encaminhamento Sugerido: ${passoAtual.texto}`);
        } else {
            console.error(`ERRO: Passo com ID "${passoId}" não encontrado.`);
        }
        rl.close(); // Fecha a interface de leitura, encerrando o programa
        return;
    }

    // Se for uma pergunta, exibe o texto e as opções
    console.log(`\n-------------------------------------`);
    console.log(`\n${passoAtual.texto}\n`);
    
    passoAtual.respostas.forEach((resposta, index) => {
        console.log(`${index + 1}) ${resposta.texto}`);
    });

    // Pede a entrada do usuário
    rl.question('\nDigite o número da sua resposta: ', (respostaIndex) => {
        const index = parseInt(respostaIndex) - 1;

        // Valida a resposta do usuário
        if (isNaN(index) || index < 0 || index >= passoAtual.respostas.length) {
            console.log("\nOpção inválida. Por favor, digite um dos números listados.");
            fazerPergunta(passoId); // Pergunta novamente
        } else {
            // Se a resposta for válida, encontra o próximo passo e continua o ciclo
            const proximoPassoId = passoAtual.respostas[index].proximo_passo_id;
            fazerPergunta(proximoPassoId);
        }
    });
}

// --- PONTO DE PARTIDA DO PROGRAMA ---

console.log("Bem-vindo ao sistema de encaminhamento jurídico!");
console.log("Responda às perguntas para encontrar a melhor orientação para o seu caso.");

// Inicia o questionário a partir do passo "inicio"
fazerPergunta('inicio');