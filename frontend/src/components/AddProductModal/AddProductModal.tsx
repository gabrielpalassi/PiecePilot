import Modal from '@mui/material/Modal';
import ComputerComponent from '../../intefaces/ComputerComponent';
import CloseIcon from '@mui/icons-material/Close';
import Ram from '../../intefaces/Ram';
import Motherboard from '../../intefaces/Motherboard';
import Hdd from '../../intefaces/Hdd';
import Cpu from '../../intefaces/Cpu';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './AddProductModal.scss';
import '../../styles/shared.scss';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import axios from 'axios';
import ProductImage from '../../assets/product.png';
import apiURL from '../../constants/ApiURL';

interface AddProductModalProps {
  open: boolean;
  closeFunction: () => void;
}

function AddProductModal(props: AddProductModalProps): JSX.Element {
  const [newProduct, setNewProduct] = useState<Cpu | Motherboard | Hdd | Ram>({ price: 0 } as Cpu | Motherboard | Hdd | Ram);
  const [productType, setProductType] = useState('');
  const [times100Price, setTimes100Price] = useState(0);
  const typesList: string[] = ['Placa-mãe', 'Processador', 'Memória', 'Armazenamento'];
  const hddConnectionsList: string[] = ['SATA', 'SATAIII', 'NVMe', 'PCIe4', 'PCIe3'];
  const ramTypesList: string[] = ['DDR3', 'DDR4'];
  const socketsList: string[] = ['AM4', 'LGA1200'];

  useEffect(() => {
    setNewProduct({ price: 0 } as Cpu | Motherboard | Hdd | Ram);
    setProductType('');
    setTimes100Price(0);
  }, [props.open]);

  useEffect(() => {
    setNewProduct({ price: 0 } as Cpu | Motherboard | Hdd | Ram);
    setTimes100Price(0);
  }, [productType]);

  useEffect(() => {
    setNewProduct({ ...newProduct, price: times100Price / 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [times100Price]);

  function handlePriceChange(event: any): void {
    if (event.key === 'Backspace') {
      setTimes100Price(Math.floor(times100Price / 10));
    } else if (Number(event.key) >= 0 && Number(event.key) <= 9) {
      setTimes100Price(times100Price * 10 + Number(event.key));
    }
  }

  function handleNumberOnlyInput(event: any, property: string): void {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setNewProduct({ ...newProduct, [property]: Number(event.target.value) });
    }
  }

  function addComponent(event: any, product: ComputerComponent): void {
    event.preventDefault();
    axios.post(apiURL + '/add-component', product)
      .then((_) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Modal open={props.open} onClose={() => props.closeFunction()} className='scrollable' sx={{ '& > .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
      <div className='center-vertical'>
        <div className='edit-product-container'>
          {/* Image */}
          <div className='image'>
            <img src={newProduct.image ? newProduct.image : ProductImage} alt='Produto' />
          </div>
          <form onSubmit={(event) => addComponent(event, newProduct)}>
            <div className='text'>
              <div className='title'>Adicionar Produto</div>
              {/* Tipo de Componente */}
              <div className='property'>
                <FormControl variant='standard' className='select-field' required>
                  <InputLabel id='componentType'>Tipo de Componente</InputLabel>
                  <Select
                    labelId='componentType'
                    value={productType || ''}
                    onChange={(event) => setProductType(event.target.value)}
                  >
                    {typesList.map((data, index) => (
                      <MenuItem key={index} value={data}>{data}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* Nome */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Nome'
                  variant='standard'
                  value={newProduct.name || ''}
                  onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
                  required
                />
              </div>
              {/* Imagem */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Link da Imagem'
                  variant='standard'
                  value={newProduct.image || ''}
                  onChange={(event) => setNewProduct({ ...newProduct, image: event.target.value })}
                  required
                />
              </div>
              {/* Descrição */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Descrição'
                  variant='standard'
                  value={newProduct.description || ''}
                  onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
                  required
                />
              </div>
              {/* Preço */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Preço'
                  variant='standard'
                  value={newProduct.price || ''}
                  onKeyUp={(event) => handlePriceChange(event)}
                  required
                />
              </div>
              {/* ramType */}
              {(productType === 'Placa-mãe' || productType === 'Memória') && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='ramType'>Tipo de Memória</InputLabel>
                    <Select
                      labelId='ramType'
                      value={(newProduct as Ram | Motherboard).ramType || ''}
                      onChange={(event) => setNewProduct({ ...newProduct, ramType: event.target.value })}
                    >
                      {ramTypesList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* ramSlots */}
              {productType === 'Placa-mãe' && (
                <div className='property'>
                  <TextField
                    className='text-field'
                    label='Slots de Memória'
                    variant='standard'
                    value={(newProduct as Motherboard).ramSlots || ''}
                    onChange={(event) => handleNumberOnlyInput(event, 'ramSlots')}
                    required
                  />
                </div>
              )}
              {/* sticksNumber */}
              {productType === 'Memória' && (
                <div className='property'>
                  <TextField
                    className='text-field'
                    label='Número de Pentes'
                    variant='standard'
                    value={(newProduct as Ram).sticksNumber || ''}
                    onChange={(event) => handleNumberOnlyInput(event, 'sticksNumber')}
                    required
                  />
                </div>
              )}
              {/* Socket */}
              {(productType === 'Processador' || productType === 'Placa-mãe') && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='socket'>Socket</InputLabel>
                    <Select
                      labelId='socket'
                      value={(newProduct as Cpu | Motherboard).socket || ''}
                      onChange={(event) => setNewProduct({ ...newProduct, socket: event.target.value })}
                    >
                      {socketsList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* hddConnection */}
              {productType === 'Armazenamento' && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='hddConnection'>Conexão</InputLabel>
                    <Select
                      labelId='hddConnection'
                      value={(newProduct as Hdd).hddConnection || ''}
                      onChange={(event) => setNewProduct({ ...newProduct, hddConnection: event.target.value })}
                    >
                      {hddConnectionsList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* hddConnections */}
              {productType === 'Placa-mãe' && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='hddConnections'>Conexões de Armazenamento</InputLabel>
                    <Select
                      labelId='hddConnections'
                      multiple
                      value={Array.isArray((newProduct as Motherboard).hddConnection) ? (newProduct as Motherboard).hddConnection : []}
                      onChange={(event) => setNewProduct({ ...newProduct, hddConnection: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value } as Motherboard)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((data, index) => (
                            <Chip key={index} label={data} />
                          ))}
                        </Box>
                      )}
                    >
                      {hddConnectionsList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              <div className='button-container'>
                {/* Salvar */}
                <button className='save-button edit' type='submit'>
                  <div className='button-text'>
                    <SaveOutlinedIcon sx={{ fontSize: 18 }}></SaveOutlinedIcon>
                    <span>Adicionar</span>
                  </div>
                </button>
                {/* Cancelar */}
                <button className='cancel-button' type='button' onClick={() => props.closeFunction()}>
                  <div className='button-text'>
                    <CloseIcon sx={{ fontSize: 18 }}></CloseIcon>
                    <span>Cancelar</span>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductModal;
