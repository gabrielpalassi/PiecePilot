import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ComputerComponent from '../../intefaces/ComputerComponent';
import Computer from '../../intefaces/Computer';
import CloseIcon from '@mui/icons-material/Close';
import Ram from '../../intefaces/Ram';
import Motherboard from '../../intefaces/Motherboard';
import Hdd from '../../intefaces/Hdd';
import Cpu from '../../intefaces/Cpu';
import Product from '../../intefaces/Product';
import './DetailsModal.scss';

interface DetailsModalProps {
  open: boolean;
  product: Product;
  closeFunction: () => void;
}

function DetailsModal(props: DetailsModalProps): JSX.Element {
  const [childModalIsOpen, setChildModalIsOpen] = useState(false);
  const [childModalProduct, setChildModalProduct] = useState<ComputerComponent>({} as ComputerComponent);

  function openChildModal(component: ComputerComponent): void {
    setChildModalProduct(component);
    setChildModalIsOpen(true);
  }

  function isComputer(component: Product): boolean {
    return (component.hasOwnProperty('cpu') && component.hasOwnProperty('motherBoard') && component.hasOwnProperty('rams') && component.hasOwnProperty('hdds'));
  }

  return (
    <Modal open={props.open} onClose={() => props.closeFunction()} sx={{ '& > .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
      <div className='details-container'>
        {/* Close button */}
        <div className='modal-header'>
          <button onClick={() => props.closeFunction()}>
            <CloseIcon />
          </button>
        </div>
        {/* Image */}
        <div className='image'>
          <img src={props.product.image} alt='Produto' />
        </div>
        <div className='text'>
          <div className='title'>{props.product.name}</div>
          <div className='price'>R$ {props.product.price}</div>
          {/* Component */}
          {props.product.hasOwnProperty('description') && (
            <div className='description'>{(props.product as ComputerComponent).description}</div>
          )}
          {props.product.hasOwnProperty('ramType') && (
            <div className='description'>Tipo de Memória: {(props.product as (Ram | Motherboard)).ramType}</div>
          )}
          {props.product.hasOwnProperty('ramSlots') && (
            <div className='description'>Slots de Memória: {(props.product as Motherboard).ramSlots}</div>
          )}
          {props.product.hasOwnProperty('sticksNumber') && (
            <div className='description'>Número de Pentes: {(props.product as Ram).sticksNumber}</div>
          )}
          {props.product.hasOwnProperty('hddConnection') && !Array.isArray((props.product as Hdd).hddConnection) && (
            <div className='description'>Conexão: {(props.product as Hdd).hddConnection}</div>
          )}
          {props.product.hasOwnProperty('hddConnection') && Array.isArray((props.product as Hdd).hddConnection) && (
            <div className='description'>
              <div>Conexões:</div>
              {(props.product as Motherboard).hddConnection.map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
          )}
          {props.product.hasOwnProperty('socket') && (
            <div className='description'>Socket: {(props.product as (Cpu | Motherboard)).socket}</div>
          )}
          {/* Computer */}
          {isComputer(props.product) && (
            <div>
              <div className='description'>
                <span>Processador: </span>
                <span onClick={() => openChildModal((props.product as Computer).cpu)} className='clickable'>{(props.product as Computer).cpu.name}</span>
              </div>
              <div className='description'>
                <span>Placa-mãe: </span>
                <span onClick={() => openChildModal((props.product as Computer).motherBoard)} className='clickable'>{(props.product as Computer).motherBoard.name}</span>
              </div>
              <div className='description'>
                <div>Memória:</div>
                {(props.product as Computer).rams.map((data, index) => (
                  <div onClick={() => openChildModal(data)} className='clickable' key={index}>{data.name}</div>
                ))}
              </div>
              <div className='description'>
                <div>Armazenamento:</div>
                {(props.product as Computer).hdds.map((data, index) => (
                  <div onClick={() => openChildModal(data)} className='clickable' key={index}>{data.name}</div>
                ))}
              </div>
            </div>
          )}
          {/* Child modal */}
          <DetailsModal open={childModalIsOpen} product={childModalProduct} closeFunction={() => setChildModalIsOpen(false)} />
        </div>
      </div>
    </Modal>
  );
}

export default DetailsModal;
