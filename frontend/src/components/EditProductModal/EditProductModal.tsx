import Modal from '@mui/material/Modal';
import ComputerComponent from '../../intefaces/ComputerComponent';
import CloseIcon from '@mui/icons-material/Close';
import Ram from '../../intefaces/Ram';
import Motherboard from '../../intefaces/Motherboard';
import Hdd from '../../intefaces/Hdd';
import Cpu from '../../intefaces/Cpu';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './EditProductModal.scss';
import '../../styles/shared.scss';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import axios from 'axios';
import apiURL from '../../constants/ApiURL';

interface EditProductModalProps {
  open: boolean;
  product: ComputerComponent;
  closeFunction: () => void;
}

function EditProductModal(props: EditProductModalProps): JSX.Element {
  const [alteredProduct, setAlteredProduct] = useState<Cpu | Motherboard | Hdd | Ram>(props.product as Cpu | Motherboard | Hdd | Ram);
  const [productType, setProductType] = useState('' as 'cpu' | 'motherboard' | 'hdd' | 'ram' | '');
  const hddConnectionsList: string[] = ['SATA', 'SATAIII', 'NVMe', 'PCIe4', 'PCIe3'];
  const ramTypesList: string[] = ['DDR3', 'DDR4'];
  const socketsList: string[] = ['AM4', 'LGA1200'];
  const [times100Price, setTimes100Price] = useState(0);

  useEffect(() => {
    setType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alteredProduct]);

  useEffect(() => {
    setAlteredProduct({ ...alteredProduct, price: times100Price / 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [times100Price]);

  useEffect(() => {
    setAlteredProduct(props.product as Cpu | Motherboard | Hdd | Ram);
    setTimes100Price(props.product.price * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  function setType(): void {
    if (alteredProduct.hasOwnProperty('ramSlots')) {
      setProductType('motherboard');
    } else if (alteredProduct.hasOwnProperty('ramType')) {
      setProductType('ram');
    } else if (alteredProduct.hasOwnProperty('socket')) {
      setProductType('cpu');
    } else if (alteredProduct.hasOwnProperty('hddConnection')) {
      setProductType('hdd');
    }
  }

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
      setAlteredProduct({ ...alteredProduct, [property]: Number(event.target.value) });
    }
  }

  function saveComponent(event: any, product: ComputerComponent): void {
    event.preventDefault();
    axios.put(apiURL + '/update-component', product)
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
            <img src={alteredProduct.image} alt='Produto' />
          </div>
          <form onSubmit={(event) => saveComponent(event, alteredProduct)}>
            <div className='text'>
              <div className='title'>Editar Produto</div>
              {/* Nome */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Nome'
                  variant='standard'
                  value={alteredProduct.name || ''}
                  onChange={(event) => setAlteredProduct({ ...alteredProduct, name: event.target.value })}
                  required
                />
              </div>
              {/* Imagem */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Link da Imagem'
                  variant='standard'
                  value={alteredProduct.image || ''}
                  onChange={(event) => setAlteredProduct({ ...alteredProduct, image: event.target.value })}
                  required
                />
              </div>
              {/* Descrição */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Descrição'
                  variant='standard'
                  value={alteredProduct.description || ''}
                  onChange={(event) => setAlteredProduct({ ...alteredProduct, description: event.target.value })}
                  required
                />
              </div>
              {/* Preço */}
              <div className='property'>
                <TextField
                  className='text-field'
                  label='Preço'
                  variant='standard'
                  value={alteredProduct.price || ''}
                  onKeyUp={(event) => handlePriceChange(event)}
                  required
                />
              </div>
              {/* ramType */}
              {(productType === 'motherboard' || productType === 'ram') && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='ramType'>Tipo de Memória</InputLabel>
                    <Select
                      labelId='ramType'
                      value={(alteredProduct as Ram | Motherboard).ramType || ''}
                      onChange={(event) => setAlteredProduct({ ...alteredProduct, ramType: event.target.value })}
                    >
                      {ramTypesList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* ramSlots */}
              {productType === 'motherboard' && (
                <div className='property'>
                  <TextField
                    className='text-field'
                    label='Slots de Memória'
                    variant='standard'
                    value={(alteredProduct as Motherboard).ramSlots || ''}
                    onChange={(event) => handleNumberOnlyInput(event, 'ramSlots')}
                    required
                  />
                </div>
              )}
              {/* sticksNumber */}
              {productType === 'ram' && (
                <div className='property'>
                  <TextField
                    className='text-field'
                    label='Número de Pentes'
                    variant='standard'
                    value={(alteredProduct as Ram).sticksNumber || ''}
                    onChange={(event) => handleNumberOnlyInput(event, 'sticksNumber')}
                    required
                  />
                </div>
              )}
              {/* Socket */}
              {(productType === 'cpu' || productType === 'motherboard') && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='socket'>Socket</InputLabel>
                    <Select
                      labelId='socket'
                      value={(alteredProduct as Cpu | Motherboard).socket || ''}
                      onChange={(event) => setAlteredProduct({ ...alteredProduct, socket: event.target.value })}
                    >
                      {socketsList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* hddConnection */}
              {productType === 'hdd' && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='hddConnection'>Conexão</InputLabel>
                    <Select
                      labelId='hddConnection'
                      value={(alteredProduct as Hdd).hddConnection || ''}
                      onChange={(event) => setAlteredProduct({ ...alteredProduct, hddConnection: event.target.value })}
                    >
                      {hddConnectionsList.map((data, index) => (
                        <MenuItem key={index} value={data}>{data}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              {/* hddConnections */}
              {productType === 'motherboard' && (
                <div className='property'>
                  <FormControl variant='standard' className='select-field' required>
                    <InputLabel id='hddConnections'>Conexões de Armazenamento</InputLabel>
                    <Select
                      labelId='hddConnections'
                      multiple
                      value={(alteredProduct as Motherboard).hddConnection}
                      onChange={(event) => setAlteredProduct({ ...alteredProduct, hddConnection: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value } as Motherboard)}
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
                    <span>Salvar</span>
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

export default EditProductModal;
