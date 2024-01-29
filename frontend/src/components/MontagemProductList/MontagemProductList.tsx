import { useEffect, useState } from 'react';
import '../../styles/shared.scss';
import DetailsModal from '../DetailsModal/DetailsModal';
import Skeleton from '@mui/material/Skeleton';
import ComputerComponent from '../../intefaces/ComputerComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SearchBar from '../SearchBar/SearchBar';
import NoResults from '../../assets/no-results.png';
import './MontagemProductList.scss';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import MontagemListProduct from '../../intefaces/MontagemListProduct';

interface MontagemProductListProps {
  products: MontagemListProduct[] | undefined | null;
  title: string;
  addToComputer: (component: ComputerComponent) => void;
  removeFromComputer: (component: ComputerComponent) => void;
}

function MontagemProductList(props: MontagemProductListProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<MontagemListProduct>({} as MontagemListProduct);
  const [filteredProducts, setFilteredProducts] = useState<MontagemListProduct[] | undefined | null>(props.products);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(props.products ? Math.ceil(props.products.length / 4) : 1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMaxPage(props.products ? Math.ceil(props.products.length / 4) : 1);
    setPage(1);
    setFilteredProducts(props.products);
    if (props.products && props.products.length > 0) setLoaded(true);
  }, [props.products]);

  function openModal(component: MontagemListProduct): void {
    setModalProduct(component);
    setModalIsOpen(true);
  }

  function handleSearch(search: string): void {
    if (props.products) {
      if (search.length === 0) {
        setFilteredProducts(props.products);
      } else {
        const filtered: any = [];
        for (const product of props.products) {
          if (product.hasOwnProperty('name')) {
            if (product.name.toLowerCase().includes(search.toLowerCase())) {
              filtered.push(product);
            }
          }
        }
        setFilteredProducts(filtered);
      }
    }
    setPage(1);
  }

  return (
    <section>
      {/* Title and search bar */}
      <div className='header'>
        <div className='section-title'>{props.title}</div>
        <div className='search-bar'>
          <SearchBar searchFunction={(search) => { handleSearch(search) }} />
        </div>
      </div>
      <div className='fixed-height-div'>
        {/* Content hasnt loaded yet */}
        {!loaded && (
          <div className='cards-container'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div className='card' key={index}>
                <Skeleton variant="rectangular" sx={{ width: '100%', height: '14vw', borderRadius: '5px', marginBottom: '20px' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '100%', marginBottom: '20px' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '25%', marginBottom: '20px' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.85rem', width: '50%' }} />
              </div>
            ))}
          </div>
        )}
        {/* Content has loaded and there's results */}
        {(filteredProducts && filteredProducts.length > 0) && (
          <div>
            <div className='cards-arrows-container negative-margin'>
              {/* Arrow left */}
              <div className='arrow-container'>
                <ArrowBackIosNewRoundedIcon className={'arrow left' + (page === 1 ? ' disabled' : '')} onClick={() => { if (page > 1) setPage(page - 1) }} />
              </div>
              {/* Cards */}
              <TransitionGroup className='cards-container'>
                {filteredProducts && filteredProducts.filter((_, index) => (index <= (page * 4 - 1) && index >= (page * 4 - 4))).map((data, index) => (
                  <CSSTransition key={index} timeout={300} classNames="card">
                    <div className='card' key={index}>
                      <div className='image'>
                        <img src={data.image} alt="Produto" />
                      </div>
                      <div className='name' >{data.name}</div>
                      <div className='price'>R$ {data.price}</div>
                      <div className='actions-container'>
                        {data.selected ? (
                          <button className='selected' onClick={() => props.removeFromComputer(data)}>
                            <div className='button-text'>Selecionado</div>
                          </button>
                        ) : (
                          <button onClick={() => props.addToComputer(data)}>
                            <div className='button-text'>Selecionar</div>
                          </button>
                        )}
                        <div className='secondary-action' onClick={() => openModal(data)}>Detalhes {'>'}</div>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
              {/* Arrow right */}
              <div className='arrow-container'>
                <ArrowForwardIosRoundedIcon className={'arrow right' + (page === maxPage ? ' disabled' : '')} onClick={() => { if (page < maxPage) setPage(page + 1) }} />
              </div>
            </div>
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
      </div>
    </section>
  );
};

export default MontagemProductList;
