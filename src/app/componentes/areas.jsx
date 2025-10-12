import './areas.css'
import Image from 'next/image'; 

export default function Area(props) {

  return (
    <div className='func_area_comp97'>
        <Image className="img_componente_func97" src={props.img_src} alt={props.img_alt} title={props.nome_valor}/>
        <h1 className='Nome_func97'>{props.nome_valor}</h1>
    </div>
  );
}
