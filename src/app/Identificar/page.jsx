"use client"

import './Page.css'
import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect } from 'react';
import useTela from '../componentes/Tela.jsx';
import NavbarMobile from '../componentes/Navbar_mobile.jsx';
import balanca from '../img/icone_balança_redonda.png'

export default function Identificar() {

   const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const largura = useTela();
  const isMobile = largura < 768;

  const [isScrolled, setIsScrolled] = useState(false)
  
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

  return (
    <div>

      <header id="main-header" className={`header_pag2 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone"></Image>
          <h1>JurisConsultor</h1>
        </div>
        {isClient && !isMobile && (
          <div className="links_header">
            <Link  href="./">Início</Link>
            <p className='p'>Identificar Necessidades</p>
            <Link  href="./Duvidas">Dúvidas frequentes</Link> 
          </div>
        )}
        {isClient && isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      
      <div className="pag_inicio">
        <div className="cabecalho">
        <Image src={balanca} alt="Icone balança" className="img_balança_ide"></Image>
        <div>
          <p className="titulo">Identificador de Necessidades Jurídicas</p>
          <p className="desc">Responda as perguntas para identificar qual área jurídica você precisa</p>
        </div>
        </div>
      </div>
    </div>
  );
}