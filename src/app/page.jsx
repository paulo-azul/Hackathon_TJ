"use client"

import Image from "next/image";
import Link from "next/link";
import icone_principal from './img/icone_balança.png';
import { useState, useEffect, useRef } from 'react';
import useTela from './componentes/Tela.jsx';
import Funciona from './componentes/funciona.jsx';
import Area from './componentes/areas.jsx';
import './page.css'
import NavbarMobile from './componentes/Navbar_mobile.jsx';
import balança from './img/balança.png';
import icone_chat from './img/conversation.png';
import icone_multiple from './img/multiple.png';
import personalização from './img/personalização.png';
import familia from './img/family.png';
import civil from './img/civil.png';
import consumidor from './img/consumidor.png';
import trabalho from './img/trabalho.png';

export default function Home() {

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

      <header id="main-header" className={`header_pag ${isScrolled ? 'scrolled' : ''}`}>
        <div className="div_icone">
          <Image src={icone_principal} alt="logo JurisConsultor" className="img_icone"></Image>
          <h1>JurisConsultor</h1>
        </div>
        {!isMobile && (
          <div className="links_header">
            <p className="p">Início</p>
            <Link  href={"./Identificar"} className="lnk">Identificar Necessidades</Link>
            <Link  href={"./Duvidas"} className="lnk">Dúvidas frequentes</Link> 
          </div>
        )}
        {isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      <div className="pag_inicio">
        <div className="div_icone_incio">
          <Image src={balança} alt="Icone balança" className="img_balança_ini" ></Image>
          <h1>Orientação Jurídica Inteligente</h1>
        </div>
        <div className="pag_inicio_txt_ini">
          <h1 className="pag_inicio_txt_ini_tit">Descubra como resolver seus problemas jurídicos</h1>
          <p className="pag_inicio_txt_ini_tit_p">Responda algumas perguntas e nosso sistema inteligente identificará qual sua necessidade jurídica e como você pode resolver seu problema.</p>
          <div className="div_links_paginitxt">
            <Link href={"./Identificar"} className="linkazul" >Começar agora</Link>
            <Link href={"./Duvidas"} className="linkn">Dúvidas frequentes</Link> 
          </div>
        </div>
      </div>
      <div className="div_como_funciona">
          <h1>Como funciona</h1>
          <h2 className="desc_como_func">Nossa ferramenta simplifica o processo de encontrar a orientação jurídica adequada pra você</h2>
          <div className="com_funcss_div">
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
        <div className="div_areas">
          <div className="areas_txt">
            <h1 className="tit_areas">Áreas Cobertas</h1>
            <p className="desc_areas">Identificamos necessidades nas principais áreas do direito</p>
          </div>
          <div className="comp_areas">
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
        <div className="area_final">
          <div className="necessidade_jurd">
            <h1>Pronto para descobrir sua necessidade jurídica?</h1>
            <h1>Nosso sistema de perguntas levará apenas alguns minutos</h1>
            <Link href={"./Identificar"} className="linkamarelo" >Inicar Identificação</Link>
          </div>
        </div>
      
    </div>
  );
}
