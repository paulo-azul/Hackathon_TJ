Ágora - Sistema de Triagem Jurídica Inteligente
Projeto desenvolvido para o Hackathon+ TJBA (Outubro de 2025)

O projeto Ágora é uma solução web criada para o Desafio 1: A dificuldade do cidadão em ter acesso a todas as formas de justiça. Mapeamos o problema e percebemos que ele é causado, em grande parte, pela falta de conhecimento sobre os diversos mecanismos jurídicos disponíveis.

Para solucionar isso, criamos um sistema que, através de perguntas simples e com base nas respostas do usuário, realiza uma triagem inteligente e o guia para o caminho mais eficiente de resolução, com foco em medidas conciliatórias e na "desprocessalização" da vida cívica.

Link para a aplicação: https://hackathon-tj.vercel.app/Home

Como Funciona
A ideia do projeto é uma mescla entre um algoritmo de inferência probabilística e uma árvore de decisão para encontrar o melhor encaminhamento jurídico para a necessidade do usuário.

Estrutura de Dados Híbrida
O núcleo do sistema é composto por uma base de conhecimento bem estruturada:

Entidades: Representam todos os resultados finais (encaminhamentos) possíveis. São as ferramentas que utilizamos para redirecionar as necessidades do usuário dentro do sistema jurídico (ex: PROCON, CEJUSC, Ministério Público).

Perguntas: Inclui tanto as perguntas de triagem inicial ("O problema é sobre um produto ou serviço?") quanto as perguntas de aprofundamento ("Você já tentou resolver diretamente com a empresa?"). Uma funcionalidade essencial é o campo preRequisito, que cria uma dependência lógica, garantindo que uma pergunta só seja feita se o contexto for apropriado.

Caminhos e Respostas: Uma estrutura que mapeia a sequência de respostas "corretas" para se chegar a cada entidade final. As respostas são geradas dinamicamente a partir desses caminhos, formando a base de conhecimento para o algoritmo.

Algoritmos Principais
calcularPesosDasEntidades: O coração do sistema. A cada resposta do usuário, este algoritmo recalcula um "peso" para cada entidade. Um bônus é aplicado por acerto, mas uma penalidade muito maior é aplicada por erro. Isso faz com que entidades que não correspondem ao cenário do usuário sejam rapidamente descartadas.

escolherMelhorPergunta: Este algoritmo analisa as entidades ainda "vivas" (com peso relevante) e escolhe dinamicamente qual a próxima pergunta a ser feita. Ele seleciona a pergunta com o maior potencial de dividir o grupo de possibilidades, otimizando a busca e garantindo que o sistema chegue a uma conclusão com o mínimo de perguntas.

O Fluxo do Algoritmo em Dois Estágios
Estágio 1: Triagem Inicial Aleatória

O sistema sabe que as primeiras perguntas são cruciais para definir a área geral do problema.

Para tornar a interação menos repetitiva, ele embaralha a ordem dessas perguntas iniciais.

Assim que o usuário responde "SIM" a uma delas, o sistema assume aquela como a área principal e avança para o próximo estágio.

Estágio 2: Aprofundamento Probabilístico

Com a área geral definida, o sistema passa a usar o algoritmo escolherMelhorPergunta para fazer as perguntas aninhadas e específicas daquele contexto.

O diagnóstico é aprofundado a cada resposta, até que o algoritmo não encontre mais perguntas relevantes a fazer ou que o peso da entidade mais provável seja significativamente maior que as demais, indicando o encaminhamento correto.