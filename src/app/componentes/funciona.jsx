import './funciona.css'
import Image from 'next/image'; 

export default function Func(props) {

  return (
    <div className='func_dic_comp20'>
        <Image className="img_componente_func20" src={props.img_src} alt={props.img_alt} title={props.nome_valor}/>
        <h1 className='Nome_func20'>{props.nome_valor}</h1>
        <p className='descricao_func20'>{props.descricao} </p>
    </div>
  );
}
