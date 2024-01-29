import './Carrinho.scss';
import '../../styles/shared.scss'
import { useContext, useState } from 'react';
import { CartContext } from '../../providers/CartProvider';
import { TextField } from '@mui/material';
import MaskedInput from 'react-text-mask';
import NoResults from '../../assets/no-results.png';
import axios from 'axios';
import apiURL from '../../constants/ApiURL';

function Carrinho(): JSX.Element {
  const cartItems = useContext(CartContext).cartItems;
  const cartSellerId = useContext(CartContext).sellerId;
  const removeFromCart = useContext(CartContext).removeFromCart;
  const addToCart = useContext(CartContext).addToCart;
  const [clientCPF, setClientCPF] = useState('');
  const cpfMask: (string | RegExp)[] = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  function sendOrder(event: any): void {
    event.preventDefault();
    axios.post(apiURL + '/checkout', null, { params: { sellerId: cartSellerId, clientCpf: clientCPF } })
      .then((_) => {
        window.location.reload();
      })
      .catch((_) => {
        alert('Erro ao finalizar pedido. Verifique se o CPF informado está cadastrado e tente novamente.');
      });
  }

  return (
    <div className="cart-grid">
      {/* Listagem de itens */}
      <section>
        <table>
          <thead>
            <tr>
              <th className='image'>Produto</th>
              <th className='name'></th>
              <th className='quantity'>Quantidade</th>
              <th className='price'>Subtotal</th>
            </tr>
          </thead>
          {cartItems.length > 0 && (
            <tbody>
              {cartItems.map((item, index) => (
                <tr className='product' key={index}>
                  <td>
                    <img className='width100' src={item.product.image} alt="Produto" />
                  </td>
                  <td className='name'>{item.product.name}</td>
                  <td>
                    <div className='quantity-container'>
                      <div className='quantity-button' onClick={() => removeFromCart(item.product)}>-</div>
                      {item.quantity}
                      <div className='quantity-button' onClick={() => addToCart(item.product)}>+</div>
                    </div>
                  </td>
                  <td className='price'>R$ {item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          )}
          {/* No items */}
          {cartItems.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={4} className='no-border'>
                  <div className='no-results'>
                    <div>
                      <img src={NoResults} alt="Sem resultados" />
                      <div>Nenhum produto no carrinho.</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </section>
      {/* Resumo da ordem */}
      <section className='summary'>
        <form onSubmit={sendOrder}>
          <div className='title'>Resumo do pedido</div>
          <div className='client-container'>
            <MaskedInput
              required
              mask={cpfMask}
              guide={false}
              value={clientCPF}
              onChange={(event) => setClientCPF(event.target.value)}
              render={(ref, props) => (
                <TextField
                  {...props}
                  inputRef={ref}
                  placeholder="CPF do cliente"
                  variant="standard"
                />
              )}
            />
          </div>
          <div className='total'>
            <div>Total</div>
            <div className='price'>R$ {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</div>
          </div>
          <button className='checkout-button' type='submit' disabled={!(clientCPF.length === 14 && cartItems.length > 0)}>
            <div className='text-wrapper'>Finalizar</div>
          </button>
        </form>
      </section>
    </div>
  );
};

export default Carrinho;
