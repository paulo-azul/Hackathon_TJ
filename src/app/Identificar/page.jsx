"use client"

import './Page.css'
import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect } from 'react';
import useTela from '../componentes/Tela.jsx';
import NavbarMobile from '../componentes/Navbar_mobile.jsx';

export default function Identificar() {
  
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
    <div>
      <header id="main-header" className={`header_pag ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone"></Image>
          <h1>JurisConsultor</h1>
        </div>
        {!isMobile && (
          <div className="links_header">
            <Link href={"/Home"}>Início</Link>
            <p className='p'>Identificar Necessidades</p>
            <Link href={"/Duvidas"}>Dúvidas frequentes</Link> 
          </div>
        )}
        {isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      <div className="pag_inicio">
          <h1>teste</h1>
      </div>
    </div>
  );
}