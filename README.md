A equipe escolheu resolver o problema 1 do Hackathon, mapeamos o problema e percebemos que ele é causado pela falta de conhecimento sobre os diversos mecanismos jurídicos para as pessoas, por isso criamos esse sistema que faz perguntas simples e baseado nas respostas ele realiza uma tragem e guia caminhos para o usuário;

A ideia do projeto é uma mescla entre um algoritmo de probabilidade e uma árvore de decisão para encontrar o melhor encaminhamento jurídico para a necessidade do usuário.

O que o código faz: Estrutura de Dados Híbrida:

Entidades: São os resultados finais da busca jurídica do usuário (ex: 'O encaminhamento... é o PROCON.'). Esses são as ferramentas que utilizaremos para redirecionar as necessidades do usuário dentro do sistema jurídico com ênfase em medidas conciliativas antes de recomendar processos ("desprocessalização" da vida cívica)

Perguntas: Inclui tanto as perguntas iniciais ("É sobre consumo?") quanto as perguntas aninhadas e específicas ("Você já tentou contato com a empresa?"). Uma funcionalidade essencial é o campo preRequisito, que cria uma dependência lógica (ex: a pergunta 201 só pode ser feita se a resposta para a pergunta 101 foi 'SIM').

Perguntas com Múltipla Escolha: O sistema suporta perguntas que não são apenas "SIM/NAO", mas que têm uma lista de opções.

Respostas: Elas são geradas automaticamente a partir de uma estrutura de caminhos, que define a sequência de respostas "corretas" para se chegar a cada entidade final.

Algoritmos:

calcularPesosDasEntidades: A lógica para cálculo de peso, com um bônus por acerto e uma penalidade muito maior por erro. Isso faz com que entidades que não correspondem a uma resposta do usuário sejam rapidamente descartadas (sua probabilidade cai drasticamente).

escolherMelhorPergunta: Leva em conta os preRequisitos para encontrar a melhor pergunta, garantindo que só fará perguntas que façam sentido no contexto das respostas já dadas.

Dois Estados do Algoritmo:

Estágio 1: Triagem Inicial Aleatória: O sistema sabe que as primeiras perguntas (101 a 104) são para definir a área geral. Em vez de perguntá-las em ordem fixa, ele as embaralha (perguntasIniciaisRandomizaveis). Isso torna a interação menos repetitiva e ajuda a focar rapidamente no que importa. Assim que o usuário responde "SIM" a uma delas, o sistema assume aquela área e preenche as outras como "NAO" automaticamente, passando para o próximo estágio.

Estágio 2: Aprofundamento Probabilístico: Uma vez definida a área geral, o sistema para de usar a lista aleatória e volta a usar o algoritmo escolherMelhorPergunta para fazer as perguntas aninhadas e específicas daquela área, aprofundando o diagnóstico até ter uma certeza estatística (quando a Entidade de maior probabilidade tiver sua probabilidade 90% maior em relação a probabilidade da Entidade com a segunda maior probabilidade) do encaminhamento correto.