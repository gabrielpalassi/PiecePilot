import { useEffect, useState, useContext } from 'react';
import '../../styles/shared.scss';
import DetailsModal from '../DetailsModal/DetailsModal';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Skeleton from '@mui/material/Skeleton';
import SearchBar from '../SearchBar/SearchBar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Product from '../../intefaces/Product';
import { CartContext } from '../../providers/CartProvider';
import NoResults from '../../assets/no-results.png';

interface ProductListProps {
  products: Product[] | undefined | null;
  title: string;
  highlights: boolean;
}

function ProductList(props: ProductListProps): JSX.Element {
  const addToCart = useContext(CartContext).addToCart;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product>({} as Product);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined | null>(props.products);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFilteredProducts(props.products);
    if (props.products && props.products.length > 0) setLoaded(true);
  }, [props.products]);

  function openModal(product: Product): void {
    setModalProduct(product);
    setModalIsOpen(true);
  }

  function handleSearch(search: string): void {
    if (props.products) {
      if (search.length === 0) {
        setFilteredProducts(props.products);
      } else {
        const filtered: Product[] = [];
        for (const product of props.products) {
          if (product.name.toLowerCase().includes(search.toLowerCase())) {
            filtered.push(product);
          }
        }
        setFilteredProducts(filtered);
      }
    }
  }

  return (
    <section>
      {/* Title and search bar */}
      <div className='header'>
        <div className='section-title'>{props.title}</div>
        {!props.highlights && (
          <div className='search-bar'>
            <SearchBar searchFunction={(search) => { handleSearch(search) }} />
          </div>
        )}
      </div>
      {/* Waiting for content */}
      {!loaded && (
        <div className={'cards-container' + (props.highlights ? ' highlights' : '')}>
          {Array.from({ length: props.highlights ? 3 : 4 }).map((_, index) => (
            <div className='card' key={index}>
              <Skeleton variant="rectangular" sx={{ width: '100%', height: '14vw', borderRadius: '5px', marginBottom: '20px' }} />
              <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '100%', marginBottom: '20px' }} />
              <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '25%', marginBottom: '20px' }} />
              <Skeleton variant="text" sx={{ fontSize: '0.85rem', width: '50%' }} />
            </div>
          ))}
        </div>
      )}
      {/* Content has loaded */}
      {(props.products && props.products.length > 0) && (filteredProducts && filteredProducts.length > 0) && (
        <div>
          <TransitionGroup className={'cards-container' + (props.highlights ? ' highlights' : '')}>
            {filteredProducts.map((data, index) => (
              <CSSTransition key={index} timeout={300} classNames="card">
                <div className='card' key={index}>
                  <div className='image'>
                    <img src={data.image} alt="Produto" />
                  </div>
                  <div className='name' >{data.name}</div>
                  <div className='price'>R$ {data.price}</div>
                  <div className='actions-container'>
                    <button onClick={() => addToCart(data)}>
                      <div className='button-text'>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }}></ShoppingCartOutlinedIcon>
                        <span>Adicionar</span>
                      </div>
                    </button>
                    <div className='secondary-action' onClick={() => openModal(data)}>Detalhes {'>'}</div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <DetailsModal open={modalIsOpen} product={modalProduct} closeFunction={() => setModalIsOpen(false)} />
        </div>
      )}
      {/* Content has loaded but no results */}
      {loaded && (!filteredProducts || filteredProducts.length === 0) && (
        <div className='no-results'>
          <div>
            <img src={NoResults} alt="Sem resultados" />
            <div>Nenhum resultado encontrado.</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
