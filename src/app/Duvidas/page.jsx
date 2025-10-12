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

  const largura = useTela();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {

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
  }, []);

  if (largura === null) {
    return null; 
  }
  
  const isMobile = largura < 768;
  
  return (
    <>
      <header id="main-header" className={`header_pag ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone" />
          <h1>JurisConsultor</h1>
        </div>
        
        {!isMobile && (
          <div className="links_header">
            <Link href={"/Home"}>Início</Link>
            <Link href={"/Identificar"}>Identificar Necessidades</Link>
            <p className='p'>Dúvidas frequentes</p>
          </div>
        )}
        {isMobile && (
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