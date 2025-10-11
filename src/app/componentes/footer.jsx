import styles from '../Duvidas/page.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.separator} />
      <div className={styles.content}>
        <p className={styles.copyright}>
          © 2025 JurisConsultor - Orientação Jurídica Inteligente
        </p>
        <p className={styles.disclaimer}>
          Este sistema oferece orientação inicial. Sempre consulte um advogado para casos específicos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;