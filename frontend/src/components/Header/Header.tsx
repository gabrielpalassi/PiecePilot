import basePath from '../../constants/BasePath';
import './Header.scss';
import '../../styles/shared.scss';
import { useLocation, Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';
import Badge from '@mui/material/Badge';

function Header() {
  const location = useLocation();
  const cartItemsCounter = useContext(CartContext).cartItemsCounter;
  const inicioIsActive: boolean = location.pathname === basePath;
  const montagemIsActive: boolean = location.pathname === (basePath + '/montagem');
  const pecasIsActive: boolean = location.pathname === (basePath + '/avulsas');
  const gestaoIsActive: boolean = location.pathname === (basePath + '/gestao');

  return (
    <header>
      <div className='header-container'>
        {/* Logo */}
        <Link to={basePath}
          style={{ color: 'inherit', textDecoration: 'inherit', fontFamily: 'Montserrat', fontSize: '1.2rem', fontWeight: '500' }}>
          PiecePilot
        </Link>
        {/* Pages */}
        <nav className='links-container'>
          <Link to={basePath} className={inicioIsActive ? 'active' : ''}>Início</Link>
          <Link to={basePath + '/montagem'} className={montagemIsActive ? 'active' : ''}>Montagem de Computadores</Link>
          <Link to={basePath + '/avulsas'} className={pecasIsActive ? 'active' : ''}>Peças Avulsas</Link>
          <Link to={basePath + '/gestao'} className={gestaoIsActive ? 'active' : ''}>Gestão de Estoque</Link>
        </nav>
        {/* Carrinho */}
        <Link to={basePath + '/carrinho'} className='cart-button-wrapper'>
          <Badge badgeContent={cartItemsCounter} color='primary' sx={{ fontSize: 18 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }}></ShoppingCartOutlinedIcon>
          </Badge>
          <div>Carrinho</div>
        </Link>
      </div>
      {/* Grey background for highlights */}
      {(montagemIsActive || pecasIsActive) && (
        <div className='grey-rectangle'></div>
      )}
    </header>
  );
};

export default Header;
