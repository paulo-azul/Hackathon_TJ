import './funciona.css'
import Image from 'next/image'; 

export default function Func(props) {

  return (
    <div className='func_dic_comp'>
        <Image className="img_componente_func" src={props.img_src} alt={props.img_alt} title={props.nome_valor}/>
        <h1 className='Nome_func'>{props.nome_valor}</h1>
        <p className='descricao_func'>{props.descricao} </p>
    </div>
  );
}
