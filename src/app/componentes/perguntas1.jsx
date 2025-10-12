import './perguntas.css';

// Ele recebe uma única prop "pergunta" (que é um objeto) e a função onResponder
export default function ComponentePergunta({ pergunta, onResponder }) {
  
  // LÓGICA DINÂMICA:
  // 1. Verificamos se a pergunta tem um array de 'opcoes' específico
  const opcoes = pergunta.opcoes 
    ? pergunta.opcoes.map(texto => ({ texto })) // Se sim, usamos essas opções
    : [{ texto: 'SIM' }, { texto: 'NÃO' }];   // Se não, usamos o padrão SIM/NÃO

  // 2. Adicionamos a opção "Não sei" a todas as perguntas
  // O valor interno será 'NAO_SEI' para o algoritmo funcionar
  opcoes.push({ texto: 'NAO_SEI' });

  // Se por algum motivo a pergunta for nula, não renderize nada
  if (!pergunta) {
    return null;
  }

  return (
    <div className='func_dic_comp99'> 
      {/* Usa o texto que vem de dentro do objeto 'pergunta' */}
      <h1 className='Tit_pergunta'>{pergunta.texto}</h1>
      <p className='explicacao_pergunta'>Escolha a opção que melhor descreve sua situação</p>
      
      {/* Mapeia as opções que acabamos de definir dinamicamente */}
      {opcoes.map((opcao, index) => (
        <div 
          key={index} 
          className='div_pergunta_quest1'
          // Chama a função do pai, passando o ID da pergunta e o texto da resposta
          onClick={() => onResponder(pergunta.id, opcao.texto)}
        >
          <div className='letra_opcao'>{String.fromCharCode(65 + index)}</div>
          
          {/* Mostra "Não sei" na tela, mas o valor enviado é "NAO_SEI" */}
          <p className='texto_opcao'>{opcao.texto === 'NAO_SEI' ? 'Não sei' : opcao.texto}</p>
        </div>
      ))}
    </div>
  );
}