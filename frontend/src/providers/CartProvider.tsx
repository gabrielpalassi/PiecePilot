import { createContext, useState, ReactNode } from 'react';
import Product from '../intefaces/Product';
import Snackbar from '@mui/material/Snackbar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import Item from '../intefaces/Item';
import apiURL from '../constants/ApiURL';

interface CartContextData {
  sellerId: string;
  cartItems: Item[];
  cartItemsCounter: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const CartContext = createContext({} as CartContextData);

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [sellerId, setSellerId] = useState('5bd6a190-c86a-4453-9a10-c35c3517b4ed');
  const [cartItems, setCartItems] = useState<Item[]>([] as Item[]);
  const [cartItemsCounter, setCartItemsCounter] = useState(0);
  const [addedSnackbarIsOpen, setAddedSnackbarIsOpen] = useState(false);
  const [addedSnackTimeout, setAddedSnackTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [removedSnackbarIsOpen, setRemovedSnackbarIsOpen] = useState(false);
  const [removedSnackTimeout, setRemovedSnackTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [errorSnackbarIsOpen, setErrorSnackbarIsOpen] = useState(false);
  const [errorSnackbarTimeout, setErrorSnackbarTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  function getCartItems(): void {
    axios.get(apiURL + '/get-cart', { params: { sellerId: sellerId } })
      .then((response) => {
        setCartItems(response.data);
        let counter = 0;
        response.data.forEach((item: any) => {
          counter += item.quantity;
        });
        setCartItemsCounter(counter);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addToCart(product: Product): void {
    axios.post(apiURL + '/add-to-cart', product, { params: { sellerId: sellerId } })
      .then((_) => {
        openAddedSnackbar();
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
        openErrorSnackbar();
      });
  }

  function removeFromCart(product: Product): void {
    axios.post(apiURL + '/remove-from-cart', product, { params: { sellerId: sellerId } })
      .then((_) => {
        openRemovedSnackbar();
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openAddedSnackbar(): void {
    if (addedSnackTimeout) clearTimeout(addedSnackTimeout);
    setAddedSnackbarIsOpen(true);
    const addedTimeoutId = setTimeout(() => {
      setAddedSnackbarIsOpen(false);
      setAddedSnackTimeout(null);
    }, 1300);
    setAddedSnackTimeout(addedTimeoutId);
  }

  function openRemovedSnackbar(): void {
    if (removedSnackTimeout) clearTimeout(removedSnackTimeout);
    setRemovedSnackbarIsOpen(true);
    const removedTimeoutId = setTimeout(() => {
      setRemovedSnackbarIsOpen(false);
      setRemovedSnackTimeout(null);
    }, 1300);
    setAddedSnackTimeout(removedTimeoutId);
  }

  function openErrorSnackbar(): void {
    if (errorSnackbarTimeout) clearTimeout(errorSnackbarTimeout);
    setErrorSnackbarIsOpen(true);
    const errorTimeoutId = setTimeout(() => {
      setErrorSnackbarIsOpen(false);
      setErrorSnackbarTimeout(null);
    }, 1300);
    setAddedSnackTimeout(errorTimeoutId);
  }

  return (
    <div>
      <CartContext.Provider value={{ sellerId, cartItems, cartItemsCounter, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
      {/* Added item */}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={addedSnackbarIsOpen}>
        <div className='snackbar-container'>
          <div className='text-container'>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }}></ShoppingCartOutlinedIcon>
            <div className='text-wrapper'>Adicionado ao carrinho.</div>
          </div>
          <button className='no-border' onClick={() => setAddedSnackbarIsOpen(false)}>
            <CloseIcon />
          </button>
        </div>
      </Snackbar>
      {/* Removed item */}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={removedSnackbarIsOpen}>
        <div className='snackbar-container'>
          <div className='text-container'>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }}></ShoppingCartOutlinedIcon>
            <div className='text-wrapper'>Removido do carrinho.</div>
          </div>
          <button className='no-border' onClick={() => setRemovedSnackbarIsOpen(false)}>
            <CloseIcon />
          </button>
        </div>
      </Snackbar>
      {/* Error */}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={errorSnackbarIsOpen}>
        <div className='snackbar-container no-padding'>
          <Alert onClose={() => setErrorSnackbarIsOpen(false)} severity="error" sx={{ width: '100%' }}>
            Algo deu errado!
          </Alert>
        </div>
      </Snackbar>
    </div>

  );
};

export default CartProvider;
