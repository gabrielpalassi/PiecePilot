import './Inicio.scss';
import BuildingImage from '../../assets/building.png';
import SearchImage from '../../assets/search.png';
import { Link } from 'react-router-dom';
import basePath from '../../constants/BasePath';
import ProductList from '../../components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ComputerComponent from '../../intefaces/ComputerComponent';
import apiURL from '../../constants/ApiURL';

function Inicio(): JSX.Element {
  const [highlights, setHighlights] = useState<ComputerComponent[]>([] as ComputerComponent[]);

  useEffect(() => {
    axios.get(apiURL + '/components')
      .then((response) => {
        setHighlights([response.data.cpu[2], response.data.rams[1], response.data.hdds[0]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* Banner montagem fácil de computadores */}
      <section className='banner-section'>
        <div className='text-div'>
          <div className='title'>Montagem fácil de computadores.</div>
          <div className='description'>Com um catálogo mutável, cálculo automático de preços e gestão de compatibilidade, o PiecePilot torna a montagem de PCs mais fácil e eficiente do que nunca.</div>
          <Link to={basePath + '/montagem'}>
            <button>Monte um computador</button>
          </Link>
        </div>
        <img src={BuildingImage} alt='Montagem de computadores'/>
      </section>
      {/* Produtos em destaque */}
      <div className='highlights-section'>
        <div className='highlights-container'>
          <ProductList products={highlights} title='Produtos em destaque' highlights={true}/>
        </div>
      </div>
      {/* Banner explore componentes */}
      <section className='banner-section'>
        <img src={SearchImage} alt='Pesquisa de componentes' />
        <div className='text-div'>
          <div className='title'>Explore componentes diversos.</div>
          <div className='description'>O PiecePilot é o seu co-piloto na jornada de vendas. Explore seu catálogo de produtos, adicione peças avulsas ao carrinho e realize vendas dos mais diversos componentes.</div>
          <Link to={basePath + '/avulsas'}>
            <button>Explore peças avulsas</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
