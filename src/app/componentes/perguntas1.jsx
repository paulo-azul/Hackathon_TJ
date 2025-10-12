import './perguntas.css';
import { useState, useEffect } from 'react'; 

export default function ComponentePergunta({ pergunta, onResponder }) {
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  
  useEffect(() => {
    
    setIsTransitioning(true);


    const timer = setTimeout(() => {
      
      setIsTransitioning(false);
    }, 150); 

    
    return () => clearTimeout(timer);
  }, [pergunta]); 

  const opcoes = pergunta?.opcoes 
    ? pergunta.opcoes.map(texto => ({ texto }))
    : [{ texto: 'SIM' }, { texto: 'NÃO' }];
  
  if (pergunta) {
    opcoes.push({ texto: 'NAO_SEI' });
  }

  if (!pergunta) {
    return null;
  }

  return (
  
    <div className={`func_dic_comp99 ${isTransitioning ? 'transitioning' : ''}`}> 
      <h1 className='Tit_pergunta'>{pergunta.texto}</h1>
      <p className='explicacao_pergunta'>Escolha a opção que melhor descreve sua situação</p>
      
      {opcoes.map((opcao, index) => (
        <div 
          key={index} 
          className='div_pergunta_quest1'
          onClick={() => onResponder(pergunta.id, opcao.texto)}
        >
          <div className='letra_opcao'>{String.fromCharCode(65 + index)}</div>
          <p className='texto_opcao'>{opcao.texto === 'NAO_SEI' ? 'NÃO SEI' : opcao.texto}</p>
        </div>
      ))} 
    </div>
  );
}