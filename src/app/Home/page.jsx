"use client"

import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect, useRef } from 'react';
import useTela from '../componentes/Tela.jsx';
import Funciona from '../componentes/funciona.jsx';
import Area from '../componentes/areas.jsx';
import './page.css'
import NavbarMobile from '../componentes/Navbar_mobile.jsx';
import balança from '../img/blindfold.png';
import icone_chat from '../img/conversation.png';
import icone_multiple from '../img/multiple.png';
import personalização from '../img/personalização.png';
import familia from '../img/family.png';
import civil from '../img/civil.png';
import consumidor from '../img/consumidor.png';
import trabalho from '../img/trabalho.png';
import Footer from '../componentes/footer';

export default function Home() {

   const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false)
  const largura = useTela();

  useEffect(() => {
    
    if (largura === null) {
      return; 
    }

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
  }, [largura]); 

  
  const isMobile = largura !== null && largura < 768;

  if (largura === null) return null; 

  return (
    <div>
      <header id="main-header" className={`header_pag11 ${isScrolled ? 'scrolled1' : ''}`}>
        <div className="div_icone1">
          <Image src={balança} alt="logo Ágora" className="img_icone1"></Image>
          <h1>Ágora</h1>
        </div>
        {isClient && !isMobile && (
          <div className="links_header1">
            <p className="p1">Início</p>
            <Link  href="/Identificar" className="lnk1">Identificar Necessidades</Link>
            <Link  href="/Duvidas" className="lnk1">Dúvidas frequentes</Link> 
          </div>
        )}
        {isClient && isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      <div className="pag_inicio1">
        <div className="div_icone_incio1">
          <Image src={balança} alt="Icone balança" className="img_balança_ini1" ></Image>
          <h1>Orientação Jurídica Inteligente</h1>
        </div>
        <div className="pag_inicio_txt_ini1">
          <h1 className="pag_inicio_txt_ini_tit1">Descubra como resolver seus problemas jurídicos</h1>
          <p className="pag_inicio_txt_ini_tit_p1">Responda algumas perguntas e nosso sistema inteligente identificará qual sua necessidade jurídica e como você pode resolver seu problema.</p>
          <div className="div_links_paginitxt1">
            <Link href="/Identificar" className="linkazul1" >Começar agora</Link>
            <Link href="/Duvidas" className="linkn1">Dúvidas frequentes</Link> 
          </div>
        </div>
      </div>
      <div className="div_como_funciona1">
          <h1>Como funciona</h1>
          <h2 className="desc_como_func1">Nossa ferramenta simplifica o processo de encontrar a orientação jurídica adequada pra você</h2>
          <div className="com_funcss_div1">
            <Funciona 
                    img_src={icone_chat}
                    img_alt="Ícone representando a conversa entre o sistema e a pessoa"
                    nome_valor="Identificação Inteligente"
                    descricao="Sistema de perguntas que identifica sua necessidade jurídica específica"
                  />
            <Funciona 
                    img_src={personalização}
                    img_alt="Ícone representando a conversa entre o sistema e a pessoa"
                    nome_valor="Orientação Personalizada"
                    descricao="Receba orientações específicas para sua situação jurídica"
                  />
            <Funciona 
                    img_src={icone_multiple}
                    img_alt="Ícone representando a conversa entre o sistema e a pessoa"
                    nome_valor="Múltiplas Áreas"
                    descricao="Cobertura de diversas áreas do direito brasileiro"
                  />
          </div>
        </div>
        <div className="div_areas1">
          <div className="areas_txt1">
            <h1 className="tit_areas1">Áreas Cobertas</h1>
            <p className="desc_areas1">Identificamos necessidades nas principais áreas do direito</p>
          </div>
          <div className="comp_areas1">
            <Area
                    img_src={trabalho}
                    img_alt="Ícone representando o direito trabalhista"
                    nome_valor="Direito do Trabalho"
                  />
            <Area
                    img_src={civil}
                    img_alt="Ícone representando o direito civíl"
                    nome_valor="Direito Civil"
                  />
            <Area
                    img_src={consumidor}
                    img_alt="Ícone representando o direito do consumidor"
                    nome_valor="Direito do Consumidor"
                  />
            <Area
                    img_src={familia}
                    img_alt="Ícone representando o direito da família"
                    nome_valor="Direito de Família"
                  />
          </div>
        </div>
        <div className="area_final1">
          <div className="necessidade_jurd1">
            <h1>Pronto para descobrir sua necessidade jurídica?</h1>
            <h1>Nosso sistema de perguntas levará apenas alguns minutos</h1>
            <Link href="/Identificar" className="linkamarelo1" >Inicar Identificação</Link>
          </div>
        </div>

      <Footer />
      
    </div>
  );
}