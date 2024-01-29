import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/shared.scss';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import SearchBar from '../../components/SearchBar/SearchBar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NoResults from '../../assets/no-results.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Gestão.scss';
import AddIcon from '@mui/icons-material/Add';
import EditProductModal from '../../components/EditProductModal/EditProductModal';
import AddProductModal from '../../components/AddProductModal/AddProductModal';
import ComputerComponent from '../../intefaces/ComputerComponent';
import apiURL from '../../constants/ApiURL';

function Gestão(): JSX.Element {
  const [products, setProducts] = useState<ComputerComponent[] | undefined | null>(null);
  const [editProductIsOpen, setEditProductIsOpen] = useState(false);
  const [addProductIsOpen, setAddProductIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<ComputerComponent>({} as ComputerComponent);
  const [filteredProducts, setFilteredProducts] = useState<ComputerComponent[] | undefined | null>(products);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
    if (products && products.length > 0 && loaded === false) setLoaded(true);
  }, [products]);

  function getProducts(): void {
    axios.get(apiURL + '/components')
      .then((response) => {
        setProducts([...response.data.cpu, ...response.data.motherBoards, ...response.data.rams, ...response.data.hdds]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openModal(product: ComputerComponent): void {
    setModalProduct(product);
    setEditProductIsOpen(true);
  }

  function handleSearch(search: string): void {
    if (products) {
      if (search.length === 0) {
        setFilteredProducts(products);
      } else {
        const filtered: ComputerComponent[] = [];
        for (const product of products) {
          if (product.name.toLowerCase().includes(search.toLowerCase())) {
            filtered.push(product);
          }
        }
        setFilteredProducts(filtered);
      }
    }
  }

  function deleteProduct(product: ComputerComponent): void {
    axios.delete(apiURL + '/delete-component', { data: product })
      .then((_) => {
        getProducts();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert('Não é possível remover este produto pois ele está em uso em um computador.');
        }
      });
  }

  return (
    <div>
      {/* Sobre a gestão de estoque */}
      <section className='disclaimer-section'>
        <div className='header'>
          <div className='section-title'>Sobre a gestão de estoque</div>
        </div>
        <div>Na gerência de estoque é possível editar os parâmetros dos produtos utilizando a listagem abaixo, clicando no botão “editar” correspondente, remover produtos do estoque utilizando o botão “remover” - atenção: essa ação não é reversível! - ou então adicionar novos produtos por meio do botão de adição abaixo.</div>
      </section>
      <section className='small-margin'>
        {/* Add product and search bar */}
        <div className='header'>
          <div className='add-button-container'>
            <button onClick={() => setAddProductIsOpen(true)}>
              <div className='button-text'>
                <AddIcon sx={{ fontSize: 18 }}></AddIcon>
                <span>Adicionar produto</span>
              </div>
            </button>
            {addProductIsOpen && (
              <AddProductModal open={addProductIsOpen} closeFunction={() => setAddProductIsOpen(false)} />
            )}
          </div>
          <div className='search-bar bigger-margin'>
            <SearchBar searchFunction={(search) => { handleSearch(search) }} />
          </div>
        </div>
        {/* Waiting for content */}
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
        {/* Content has loaded */}
        {(products && products.length > 0) && (filteredProducts && filteredProducts.length > 0) && (
          <div>
            <TransitionGroup className='cards-container'>
              {filteredProducts.map((data, index) => (
                <CSSTransition key={index} timeout={300} classNames="card">
                  <div className='card' key={index}>
                    <div className='image'>
                      <img src={data.image} alt="Produto" />
                    </div>
                    <div className='name' >{data.name}</div>
                    <div className='price'>R$ {data.price}</div>
                    <div className='actions-container'>
                      <button className='edit' onClick={() => openModal(data)}>
                        <div className='button-text'>
                          <EditIcon sx={{ fontSize: 18 }}></EditIcon>
                          <span>Editar</span>
                        </div>
                      </button>
                      <button onClick={() => deleteProduct(data)}>
                        <div className='button-text'>
                          <DeleteForeverIcon sx={{ fontSize: 18 }}></DeleteForeverIcon>
                          <span>Remover</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            {editProductIsOpen && (
              <EditProductModal open={editProductIsOpen} product={modalProduct} closeFunction={() => setEditProductIsOpen(false)} />
            )}
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
    </div>
  );
};

export default Gestão;
