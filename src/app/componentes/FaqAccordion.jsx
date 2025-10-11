'use client'; // Necessário para usar hooks como o useState

import { useState } from 'react';
import styles from '../Duvidas/page.module.css';
//import styles from '../Duvidas/Pagina.css'; // Importando os estilos

// Dados das perguntas e respostas
const faqData = [
  {
    question: 'Como funciona o sistema de identificação?',
    answer: 'Nosso sistema utiliza uma série de perguntas estratégicas para analisar os detalhes da sua situação e, com base em algoritmos, identificar a área jurídica mais relevante para o seu caso.',
  },
  {
    question: 'Preciso pagar para usar o sistema?',
    answer: 'Não. O uso da nossa ferramenta de identificação inicial é totalmente gratuito. Cobranças podem ser aplicáveis apenas se você decidir contratar serviços jurídicos específicos posteriormente.',
  },
  {
    question: 'O resultado substitui uma consulta com advogado?',
    answer: 'Não. O resultado é uma indicação inicial e informativa da área do direito. Ele não substitui o conselho, o diagnóstico e a orientação de um advogado qualificado.',
  },
  {
    question: 'Quantas perguntas terei que responder?',
    answer: 'O número de perguntas varia dependendo da complexidade da sua situação, mas o sistema é projetado para ser rápido e eficiente, geralmente levando apenas alguns minutos.',
  },
  {
    question: 'E se minha situação envolver mais de uma área do direito?',
    answer: 'Nosso sistema é capaz de identificar situações multidisciplinares e indicará as principais áreas envolvidas. A análise detalhada de cada uma delas deverá ser feita com um profissional.',
  },
  {
    question: 'Posso usar o sistema mais de uma vez?',
    answer: 'Sim, você pode usar o sistema quantas vezes precisar para diferentes situações ou para refinar as informações de um mesmo caso.',
  },
  {
    question: 'Como o sistema sabe qual área jurídica indicar?',
    answer: 'O sistema cruza suas respostas com um vasto banco de dados de casos e padrões jurídicos, utilizando inteligência artificial para determinar a correspondência mais provável.',
  },
  {
    question: 'Posso compartilhar meu resultado?',
    answer: 'Sim, o resultado gerado é seu.',
  },
];

// Componente do item individual do FAQ
const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={styles.faqItem}>
      <button className={styles.questionButton} onClick={onClick}>
        <span className={styles.questionText}>{item.question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
};


// Componente principal do Acordeão
const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordionContainer}>
      {faqData.map((item, index) => (
        <FaqItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default FaqAccordion;