"use client"

import './Page.css'
import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect } from 'react';
import useTela from '../componentes/Tela.jsx';
import NavbarMobile from '../componentes/Navbar_mobile.jsx';
import balanca from '../img/icone_balança_redonda.png'
import Footer from '../componentes/footer';

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

      <header id="main-header" className={`header_pag22 ${isScrolled ? 'scrolled2' : ''}`}>
        <div className="div_icone2">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone2"></Image>
          <h1>JurisConsultor</h1>
        </div>
        {isClient && !isMobile && (
          <div className="links_header2">
            <Link  href="./">Início</Link>
            <p className='p2'>Identificar Necessidades</p>
            <Link  href="./Duvidas">Dúvidas frequentes</Link> 
          </div>
        )}
        {isClient && isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      
      <div className="pag_inicio2">
        <div className="cabecalho2">
        <Image src={balanca} alt="Icone balança" className="img_balança_ide2"></Image>
        <div>
          <p className="titulo2">Identificador de Necessidades Jurídicas</p>
          <p className="desc2">Responda as perguntas para identificar qual área jurídica você precisa</p>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}