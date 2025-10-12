"use client"

import './Pagina.css'
import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect } from 'react';
import useTela from '../componentes/Tela.jsx';
import NavbarMobile from '../componentes/Navbar_mobile.jsx';
import styles from '../componentes/page.module.css';
import FaqAccordion from '../componentes/FaqAccordion';
import CallToAction from '../componentes/cartoes';
import Footer from '../componentes/footer';

export default function Duvida() {
  // --- TODOS OS HOOKS DEVEM FICAR AQUI NO TOPO ---
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const largura = useTela();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // É seguro adicionar o listener mesmo se `largura` for null.
    // O `window` existe no cliente independentemente do estado.
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O array vazio aqui está correto, pois o efeito não depende de props/estado.

  // Agora a condição de retorno pode vir depois dos hooks, sem problemas.
  if (largura === null) {
    return null; 
  }
  
  // A lógica que depende da `largura` vem depois da verificação.
  const isMobile = largura < 768;

  return (
    <>
      <header id="main-header" className={`header_pag3 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone" />
          <h1>JurisConsultor</h1>
        </div>
        
        {isClient && !isMobile && (
          <div className="links_header">
            <Link href="./">Início</Link>
            <Link href="./Identificar">Identificar Necessidades</Link>
            <p className='p'>Dúvidas frequentes</p>
          </div>
        )}
        {isClient && isMobile && (
          <NavbarMobile />
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Dúvidas Frequentes</h1>
            <p className={styles.subtitle}>Encontre respostas para as perguntas mais comuns sobre nosso sistema</p>
          </div>
          <FaqAccordion />
          <CallToAction />
        </div>
      </main>

      <Footer />
    </>
  );
}