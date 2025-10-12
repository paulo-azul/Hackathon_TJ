"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 

export default function useTela() {
  const [largura, setLargura] = useState(null);
  const pathname = usePathname(); 

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setLargura(window.innerWidth);

    handleResize(); 

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setLargura(window.innerWidth);
    }
  }, [pathname]);

  useEffect(() => {
  console.log("largura:", largura);
}, [largura]);

useEffect(() => {
  console.log("mudou de rota:", pathname);
}, [pathname]);

  return largura;
}
