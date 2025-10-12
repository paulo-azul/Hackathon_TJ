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
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const largura = useTela();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
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
      <header id="main-header" className={`header_pag33 ${isScrolled ? 'scrolled3' : ''}`}>
        <div className="div_icone3">
          <Image src={icone_principal} alt="logo Ágora" className="img_icone3" />
          <h1>Ágora</h1>
        </div>
        
        {isClient && !isMobile && (
          <div className="links_header3">
            <Link href="/Home" className='link3'>Início</Link>
            <Link href="/Identificar" className='link3'>Identificar Necessidades</Link>
            <p className='p3'>Dúvidas frequentes</p>
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