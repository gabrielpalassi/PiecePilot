import './Montagem.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useEffect, useState, useContext } from 'react';
import Computer from '../../intefaces/Computer';
import ComputerComponent from '../../intefaces/ComputerComponent';
import Motherboard from '../../intefaces/Motherboard';
import Cpu from '../../intefaces/Cpu';
import Ram from '../../intefaces/Ram';
import Hdd from '../../intefaces/Hdd';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MontagemProductList from '../../components/MontagemProductList/MontagemProductList';
import ComputerImage from '../../assets/computer.png';
import { CartContext } from '../../providers/CartProvider';
import MontagemListProduct from '../../intefaces/MontagemListProduct';
import axios from 'axios';
import CompatibleResponse from '../../intefaces/CompatibleResponse';
import apiURL from '../../constants/ApiURL';

interface RequestBody {
  cpu: Cpu | null;
  motherBoard: Motherboard | null;
  rams: Ram[] | null;
  hdds: Hdd[] | null;
}

function Montagem(): JSX.Element {
  const addToCart = useContext(CartContext).addToCart;
  const [computer, setComputer] = useState<Computer>({ price: 0, image: ComputerImage, rams: [] as Ram[], hdds: [] as Hdd[] } as Computer);
  const [response, setResponse] = useState<CompatibleResponse>({} as CompatibleResponse);
  const [computerHighlights, setComputerHighlights] = useState<Computer[]>([] as Computer[]);

  useEffect(() => {
    axios.post(apiURL + '/compatible-components', getRequestBody(computer))
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(apiURL + '/highlight-computers')
      .then((response) => {
        setComputerHighlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sets the computer name based on the selected components and updates the compatible components
  useEffect(() => {
    let name = 'Custom Computer';
    if (computer.motherBoard) {
      name += ` - ${computer.motherBoard.name}`;
    }
    if (computer.cpu) {
      name += ` - ${computer.cpu.name}`;
    }
    if (computer.rams && computer.rams.length > 0) {
      for (let i = 0; i < computer.rams.length; i++) {
        name += ` - ${computer.rams[i].name}`;
      }
    }
    if (computer.hdds && computer.hdds.length > 0) {
      for (let i = 0; i < computer.hdds.length; i++) {
        name += ` - ${computer.hdds[i].name}`;
      }
    }
    setComputer((computer) => { return { ...computer, name: name } });
    axios.post(apiURL + '/compatible-components', getRequestBody(computer))
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computer.motherBoard, computer.cpu, computer.rams, computer.hdds]);

  function getRequestBody(computer: Computer): RequestBody {
    const requestBody = {} as RequestBody;
    if (computer.motherBoard) {
      requestBody.motherBoard = computer.motherBoard;
    } else {
      requestBody.motherBoard = null;
    }
    if (computer.cpu) {
      requestBody.cpu = computer.cpu;
    } else {
      requestBody.cpu = null;
    }
    if (computer.rams && computer.rams.length > 0) {
      requestBody.rams = computer.rams;
    } else {
      requestBody.rams = null;
    }
    if (computer.hdds && computer.hdds.length > 0) {
      requestBody.hdds = computer.hdds;
    } else {
      requestBody.hdds = null;
    }
    return requestBody;
  }

  function getProductsForList(products: ComputerComponent[], selectedProducts: ComputerComponent[] | ComputerComponent): MontagemListProduct[] | null {
    let selected: MontagemListProduct[] | MontagemListProduct | null = null;
    if (selectedProducts && !Array.isArray(selectedProducts)) {
      selected = { ...selectedProducts, selected: true };
    } else if (selectedProducts && Array.isArray(selectedProducts)) {
      selected = selectedProducts.map((product) => { return { ...product, selected: true } });
    }
    if (products && selected) {
      if (Array.isArray(selected)) {
        return [...selected, ...products];
      } else {
        return [selected, ...products];
      }
    } else if (products) {
      return products;
    } else if (selected) {
      if (Array.isArray(selected)) {
        return selected;
      } else {
        return [selected];
      }
    }
    return selected;
  }

  function addToComputer(component: ComputerComponent): void {
    for (let key in response) {
      const responseArray = response[key as keyof CompatibleResponse];
      if (responseArray) {
        for (let i = 0; i < responseArray.length; i++) {
          if (responseArray[i] === component) {
            switch (key) {
              case 'cpu':
                if (computer.cpu) {
                  setComputer({ ...computer, cpu: component as Cpu, price: computer.price - computer.cpu.price + component.price });
                } else {
                  setComputer({ ...computer, cpu: component as Cpu, price: computer.price + component.price });
                }
                break;
              case 'motherBoard':
                if (computer.motherBoard) {
                  setComputer({ ...computer, motherBoard: component as Motherboard, price: computer.price - computer.motherBoard.price + component.price });
                } else {
                  setComputer({ ...computer, motherBoard: component as Motherboard, price: computer.price + component.price });
                }
                break;
              case 'ram':
                setComputer({ ...computer, rams: computer.rams ? [...computer.rams, component as Ram] : [component as Ram], price: computer.price + component.price });
                break;
              case 'hdd':
                setComputer({ ...computer, hdds: computer.hdds ? [...computer.hdds, component as Hdd] : [component as Hdd], price: computer.price + component.price });
                break;
            }
          }
        }
      }
    }
  }

  function removeFromComputer(component: ComputerComponent): void {
    if (computer.cpu && computer.cpu.name === component.name) {
      setComputer((computer) => {
        const { cpu, ...rest } = computer;
        let updatedComputer = rest as Computer;
        updatedComputer.price = updatedComputer.price - component.price;
        return updatedComputer as Computer;
      });
    }
    if (computer.motherBoard && computer.motherBoard.name === component.name) {
      setComputer((computer) => {
        const { motherBoard, ...rest } = computer;
        let updatedComputer = rest as Computer;
        updatedComputer.price = updatedComputer.price - component.price;
        return updatedComputer as Computer;
      });
    }
    if (computer.rams && computer.rams.length > 0) {
      for (let i = 0; i < computer.rams.length; i++) {
        if (computer.rams[i].name === component.name) {
          const updatedRam = computer.rams.filter((_, index) => index !== i);
          setComputer({ ...computer, rams: updatedRam, price: computer.price - component.price });
          break;
        }
      }
    }
    if (computer.hdds && computer.hdds.length > 0) {
      for (let i = 0; i < computer.hdds.length; i++) {
        if (computer.hdds[i].name === component.name) {
          const updatedHdd = computer.hdds.filter((_, index) => index !== i);
          setComputer({ ...computer, hdds: updatedHdd, price: computer.price - component.price });
          break;
        }
      }
    }
  }

  function completeMontagemFlow(computer: Computer): void {
    addToCart(computer);
    setComputer({ price: 0, image: ComputerImage, rams: [] as Ram[], hdds: [] as Hdd[] } as Computer);
  }

  return (
    <div>
      {/* Destaques */}
      <ProductList products={computerHighlights} title='Pré-selecionados' highlights={true} />
      <section className='disclaimer-section'>
        <div className='header'>
          <div className='section-title'>Sobre a montagem personalizada</div>
        </div>
        <div>Nosso sistema de montagem de computadores é projetado para atender às necessidades dos vendedores. Inicie selecionando uma das peças abaixo que considere ideal para criar o computador perfeito para seu cliente, nosso sistema mostrará automaticamente as opções compatíveis, simplificando o processo de escolha e montagem.</div>
      </section>
      {/* Motherboard */}
      <MontagemProductList
        products={getProductsForList(response.motherBoard, computer.motherBoard)}
        title='Placas-mãe'
        addToComputer={(component) => addToComputer(component)}
        removeFromComputer={(component) => removeFromComputer(component)}
      />
      {/* CPU */}
      <MontagemProductList
        products={getProductsForList(response.cpu, computer.cpu)}
        title='Processadores'
        addToComputer={(component) => addToComputer(component)}
        removeFromComputer={(component) => removeFromComputer(component)}
      />
      {/* RAM */}
      <MontagemProductList
        products={getProductsForList(response.ram, computer.rams)}
        title='Memórias'
        addToComputer={(component) => addToComputer(component)}
        removeFromComputer={(component) => removeFromComputer(component)}
      />
      {/* HDD */}
      <MontagemProductList
        products={getProductsForList(response.hdd, computer.hdds)}
        title='Armazenamento'
        addToComputer={(component) => addToComputer(component)}
        removeFromComputer={(component) => removeFromComputer(component)}
      />
      {/* Snackbar */}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={!!computer.motherBoard || !!computer.cpu || (!!computer.rams && computer.rams.length > 0) || (!!computer.hdds && computer.hdds.length > 0)}>
        <div className='snackbar-container small-padding'>
          <div className='text-container'>
            <div className='text-wrapper'>Placa-mãe</div>
            {computer.motherBoard && (<div className='text-wrapper'><CheckIcon color='success' /></div>)}
            {!computer.motherBoard && (<div className='text-wrapper'><CloseIcon /></div>)}
            <div className='text-wrapper'>Processador</div>
            {computer.cpu && (<div className='text-wrapper'><CheckIcon color='success' /></div>)}
            {!computer.cpu && (<div className='text-wrapper'><CloseIcon /></div>)}
            <div className='text-wrapper'>Memória</div>
            {computer.rams && computer.rams.length > 0 && (<div className='text-wrapper'><CheckIcon color='success' /></div>)}
            {(!computer.rams || (computer.rams && computer.rams.length === 0)) && (<div className='text-wrapper'><CloseIcon /></div>)}
            <div className='text-wrapper'>Armazenamento</div>
            {computer.hdds && computer.hdds.length > 0 && (<div className='text-wrapper'><CheckIcon color='success' /></div>)}
            {(!computer.hdds || (computer.hdds && computer.hdds.length === 0)) && (<div className='text-wrapper'><CloseIcon /></div>)}
            <div className='text-wrapper price'>R$ {computer.price.toFixed(2)}</div>
            <button disabled={!(computer.motherBoard && computer.cpu && (computer.rams && computer.rams.length > 0) && (computer.hdds && computer.hdds.length > 0))} onClick={() => completeMontagemFlow(computer)}>
              <div className='button-text'>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }}></ShoppingCartOutlinedIcon>
                <span>Adicionar</span>
              </div>
            </button>
          </div>
        </div>
      </Snackbar>
    </div>
  );
};

export default Montagem;
