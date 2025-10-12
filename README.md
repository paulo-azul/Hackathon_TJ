A equipe escolheu resolver o problema 1 do Hackathon, mapeamos o problema e percebemos que ele é causado pela falta de conhecimento sobre os diversos mecanismos jurídicos para as pessoas, por isso criamos esse sistema que faz perguntas simples e baseado nas respostas ele realiza uma tragem e guia caminhos para o usuário;

O que o código faz:
Estrutura de Dados Híbrida:

entidades: Agora são os resultados finais (os mesmos da Versão 1, ex: 'O encaminhamento... é o PROCON.'). Isso torna o sistema muito mais granular.

perguntas: Inclui tanto as perguntas iniciais ("É sobre consumo?") quanto as perguntas aninhadas e específicas ("Você já tentou contato com a empresa?"). A novidade é o campo preRequisito, que cria uma dependência lógica (ex: a pergunta 201 só pode ser feita se a resposta para a pergunta 101 foi 'SIM').

respostas: A base de conhecimento é muito maior. Ela é gerada automaticamente a partir de uma estrutura de caminhos, que define a sequência de respostas "corretas" para se chegar a cada entidade final.

Algoritmos Aprimorados:

calcularPesosDasEntidades: A lógica de cálculo de peso é mais sofisticada, com um bônus por acerto e uma penalidade muito maior por erro. Isso faz com que entidades que não correspondem a uma resposta do usuário sejam rapidamente descartadas (sua probabilidade cai drasticamente).

escolherMelhorPergunta: Agora leva em conta os preRequisitos, garantindo que só fará perguntas que façam sentido no contexto das respostas já dadas.

Motor Interativo de Dois Estágios: Esta é a mudança mais genial.

Estágio 1: Triagem Inicial Aleatória: O sistema sabe que as primeiras perguntas (101 a 104) são para definir a área geral. Em vez de perguntá-las em ordem fixa, ele as embaralha (perguntasIniciaisRandomizaveis). Isso torna a interação menos repetitiva e ajuda a focar rapidamente no que importa. Assim que o usuário responde "SIM" a uma delas, o sistema assume aquela área e preenche as outras como "NAO" automaticamente, passando para o próximo estágio.

Estágio 2: Aprofundamento Probabilístico: Uma vez definida a área geral, o sistema para de usar a lista aleatória e volta a usar o algoritmo escolherMelhorPergunta para fazer as perguntas aninhadas e específicas daquela área, aprofundando o diagnóstico até ter uma certeza estatística (acima de 95% de probabilidade) do encaminhamento correto.

Lógica Adicional:

Perguntas com Múltipla Escolha: O sistema agora suporta perguntas que não são apenas "SIM/NAO", mas que têm uma lista de opções.

Detecção de "Outros Assuntos": Se o usuário responder "NAO" para as 4 primeiras categorias, o sistema é inteligente o suficiente para deduzir que o problema se encaixa em "Outro Assunto" e prossegue a partir daí.