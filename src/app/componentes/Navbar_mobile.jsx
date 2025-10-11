"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Navbar_mobile.css"; 
import menu_bar from '../img/menu.png';
import sair from '../img/x.png';


export default function NavbarMobile() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div>
      <button className="botao_menu" onClick={() => setMenuAberto(!menuAberto)}>
        <Image src={menu_bar} alt="menu bar" className="menu_bar"  onClick={() => setMenuAberto(true)}/>
      </button>

      {menuAberto && (
        <>
        <nav className="menu_mobile">
            <Link className="link2" href="/" onClick={() => setMenuAberto(false)}>Início</Link>
            <Link className="link2" href="/Identificar" onClick={() => setMenuAberto(false)}>Identificar Necessidades</Link>
            <Link className="link2" href="/Duvidas" onClick={() => setMenuAberto(false)}>Dúvidas Frequentes</Link>
        </nav>
        </>
      )}
    </div>
  );
}