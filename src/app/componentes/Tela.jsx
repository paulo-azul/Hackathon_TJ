"use client"
import { useEffect, useState } from 'react';

export default function useTela() {
  const [largura, setLargura] = useState(0);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);
    handleResize(); 

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return largura;
}