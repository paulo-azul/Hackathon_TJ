"use client"

import './Pagu.css'
import Image from "next/image";
import Link from "next/link";
import icone_principal from '../img/icone_balança.png';
import { useState, useEffect } from 'react';
import useTela from '../componentes/Tela.jsx';
import NavbarMobile from '../componentes/Navbar_mobile.jsx';
import balanca from '../img/icone_balança_redonda.png'
import Footer from '../componentes/footer';
import ComponentePergunta from '../componentes/perguntas1'; 

import {
  entidades,
  perguntas,
  respostas, 
  calcularPesosDasEntidades,
  escolherMelhorPergunta
} from './algoritmo.js';

export default function Identificar() {
  const [isClient, setIsClient] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(null); // Guarda o OBJETO da pergunta atual
  const [resultadoFinal, setResultadoFinal] = useState(null); // Guarda o OBJETO do resultado final

  // Lógica para randomizar as perguntas iniciais (executa apenas uma vez)
   const [ordemTriagem] = useState(() => 
    [101, 102, 103, 104].sort(() => Math.random() - 0.5)
  );

   // Esta função é o coração da lógica. Ela decide o que mostrar a seguir.

const proximaPergunta = (historicoAtual) => {
    // Mantém a verificação para o "NAO_SEI"
    const todasAsRespostasSaoNaoSei = historicoAtual.length > 0 && historicoAtual.every(r => r.answer === 'NAO_SEI');
    if (historicoAtual.length >= 4 && todasAsRespostasSaoNaoSei) {
        const resultadoGenerico = entidades.find(e => e.id === 99);
        if (resultadoGenerico) {
            setResultadoFinal(resultadoGenerico);
            setPerguntaAtual(null);
            return;
        }
    }

    // --- VERIFICAÇÃO PARA O "NÃO" CORRIGIDA ---
    // Usamos um nome de variável diferente para não haver conflito
    const todosOsIdsIniciaisCheck = [101, 102, 103, 104, 105];
    const respostasIniciais = historicoAtual.filter(r => todosOsIdsIniciaisCheck.includes(r.questionId));

    if (respostasIniciais.length === 5 && respostasIniciais.every(r => r.answer === 'NAO')) {
        const resultadoGenerico = entidades.find(e => e.id === 99);
        if (resultadoGenerico) {
            setResultadoFinal(resultadoGenerico);
            setPerguntaAtual(null);
            return;
        }
    }

    const entidadesComPesos = calcularPesosDasEntidades(historicoAtual, entidades, respostas);
    
    const idsPerguntasIniciais = ordemTriagem; 

    const saiuDaTriagem = historicoAtual.some(
      r => r.answer === 'SIM' && idsPerguntasIniciais.includes(r.questionId)
    );

    const idsPerguntasJaFeitas = historicoAtual.map(r => r.questionId);
    const perguntasIniciaisDisponiveis = idsPerguntasIniciais.filter(id => !idsPerguntasJaFeitas.includes(id));

    let melhorPergunta;

    if (!saiuDaTriagem && perguntasIniciaisDisponiveis.length > 0) {
      console.log("MODO: Triagem Principal. Próxima pergunta disponível:", perguntasIniciaisDisponiveis[0]);
      const proximoId = perguntasIniciaisDisponiveis[0]; 
      melhorPergunta = perguntas.find(p => p.id === proximoId);
    }
    else if (!saiuDaTriagem && perguntasIniciaisDisponiveis.length === 0 && !idsPerguntasJaFeitas.includes(105)) {
        console.log("MODO: Triagem Final. Apresentando a pergunta 'Outros'.");
        melhorPergunta = perguntas.find(p => p.id === 105);
    }
    else {
      console.log("MODO: Aprofundamento Inteligente.");
      const candidatos = entidadesComPesos.filter(e => e.peso > 0.001);
      const idsDeTodasAsPerguntasIniciais = [101, 102, 103, 104, 105];
      const perguntasParaEscolha = saiuDaTriagem 
        ? perguntas.filter(p => !idsDeTodasAsPerguntasIniciais.includes(p.id)) 
        : perguntas;

      melhorPergunta = escolherMelhorPergunta(
          candidatos, 
          idsPerguntasJaFeitas, 
          perguntasParaEscolha,
          respostas, 
          historicoAtual
      );
    }
    
    if (melhorPergunta) {
      setPerguntaAtual(melhorPergunta);
    } else {
      const melhorResultado = entidadesComPesos[0] || entidades.find(e => e.id === 99);
      setResultadoFinal(melhorResultado);
      setPerguntaAtual(null);
    }
};

  useEffect(() => {
    proximaPergunta(historico);
}, [historico]);

  const handleResponder = (idPergunta, resposta) => {
    const novaResposta = { questionId: idPergunta, answer: resposta };
    setHistorico(historicoAnterior => [...historicoAnterior, novaResposta]);
  };
  
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

    useEffect(() => {
    console.log("Histórico de respostas atualizado:", historico);
}, [historico]);

  return (
    <div className="page-container"> 

      <header id="main-header" className={`header_pag22 ${isScrolled ? 'scrolled2' : ''}`}>
        <div className="div_icone2">
          <Image src={icone_principal} alt="logo Ágora" className="img_icone2"></Image>
          <h1>Ágora</h1>
        </div>
        {isClient && !isMobile && (
          <div className="links_header222">
            <Link  href="/Home" className='link22'>Início</Link>
            <p className='p2'>Identificar Necessidades</p>
            <Link  href="/Duvidas" className='link22'>Dúvidas frequentes</Link> 
          </div>
        )}
        {isClient && isMobile && (
            <>
              <NavbarMobile />
            </>
          )}
      </header>
      <main className="main-content">
        <div className="pag_inicio2">
          <div className="cabecalho2">
          <Image src={balanca} alt="Icone balança" className="img_balança_ide2"></Image>
          <div>
            <p className="titulo2">Identificador de Necessidades Jurídicas</p>
            <p className="desc2">Responda as perguntas para identificar qual área jurídica você precisa</p>
          </div>
          </div>
        </div>
        <div className='quests'>
          {/* RENDERIZAÇÃO CONDICIONAL: OU MOSTRA O RESULTADO, OU A PERGUNTA */}

          {/* Se tiver um resultado final, mostre-o */}
          {resultadoFinal && (
            <div className='resultado_final_container'>
              <h3>✅ Encaminhamento Sugerido para a data de hoje, 12 de outubro de 2025, em Salvador:</h3>
              <p>{resultadoFinal.nome}</p>
            </div>
          )}

          {/* Se NÃO tiver resultado e TIVER uma pergunta atual, mostre a pergunta */}
          {!resultadoFinal && perguntaAtual && (
            <ComponentePergunta 
              pergunta={perguntaAtual} // Passa o objeto inteiro da pergunta
              onResponder={handleResponder} // Passa a função para receber a resposta
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}