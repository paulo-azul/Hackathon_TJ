import Link from 'next/link';
import { BsChatQuote } from 'react-icons/bs'; 
import { FiMail } from 'react-icons/fi'; 
import styles from './page.module.css';

const CallToAction = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaCard}>
        <div className={styles.iconWrapper}>
          <BsChatQuote size={24} />
        </div>
        <h3 className={styles.ctaTitle}>Ainda tem dúvidas?</h3>
        <p className={styles.ctaText}>
          Experimente nosso sistema de identificação gratuitamente
        </p>
        <Link href="/Identificar" className={`${styles.ctaButton} ${styles.primary}`}>
          Começar Agora
        </Link>
      </div>

      <div className={styles.ctaCard}>
        <div className={styles.iconWrapper}>
          <FiMail size={24} />
        </div>
        <h3 className={styles.ctaTitle}>Precisa de ajuda?</h3>
        <p className={styles.ctaText}>
          Entre em contato conosco para mais informações
        </p>
        <Link href="/Contato" className={`${styles.ctaButton} ${styles.secondary}`}>
          Fale Conosco
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;