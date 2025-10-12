import './areas.css'
import Image from 'next/image'; 

export default function Area(props) {

  return (
    <div className='func_area_comp'>
        <Image className="img_componente_func" src={props.img_src} alt={props.img_alt} title={props.nome_valor}/>
        <h1 className='Nome_func'>{props.nome_valor}</h1>
    </div>
  );
}
