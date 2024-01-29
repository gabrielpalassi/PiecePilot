import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Cpu from '../../intefaces/Cpu';
import Motherboard from '../../intefaces/Motherboard';
import Hdd from '../../intefaces/Hdd';
import Ram from '../../intefaces/Ram';
import axios from 'axios';
import ProductsResponse from '../../intefaces/ProductsResponse';
import ComputerComponent from '../../intefaces/ComputerComponent';
import apiURL from '../../constants/ApiURL';

function Avulsas(): JSX.Element {
  const [response, setResponse] = useState<ProductsResponse>({
    cpu: [] as Cpu[],
    motherBoards: [] as Motherboard[],
    hdds: [] as Hdd[],
    rams: [] as Ram[]
  } as ProductsResponse);
  const [highlights, setHighlights] = useState<ComputerComponent[]>([] as ComputerComponent[]);

  useEffect(() => {
    axios.get(apiURL + '/components')
      .then((response) => {
        setHighlights([response.data.cpu[2], response.data.rams[1], response.data.hdds[0]]);
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* Destques */}
      <ProductList products={highlights} title='Produtos em destaque' highlights={true} />
      {/* Listagem */}
      <ProductList
        products={[...response.cpu, ...response.motherBoards, ...response.rams, ...response.hdds]}
        title='Explore componentes'
        highlights={false} />
    </div>
  );
};

export default Avulsas;
