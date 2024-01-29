import './index.scss';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './styles/theme';
import './styles/shared.scss'
import basePath from './constants/BasePath';
import Header from './components/Header/Header';
import Inicio from './pages/Inicio/Inicio';
import Montagem from './pages/Montagem/Montagem';
import Avulsas from './pages/Avulsas/Avulsas';
import Gestão from './pages/Gestão/Gestão';
import Empty from './pages/Empty/Empty';
import Carrinho from './pages/Carrinho/Carrinho';
import CartProvider from './providers/CartProvider';
import Logar from './pages/Logar/Logar';
import Cadastrar from './pages/Cadastrar/Cadastrar';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path={basePath} element={<Inicio />} />
            <Route path={basePath + '/montagem'} element={<Montagem />} />
            <Route path={basePath + '/avulsas'} element={<Avulsas />} />
            <Route path={basePath + '/gestao'} element={<Gestão />} />
            <Route path={basePath + '/carrinho'} element={<Carrinho />} />
            <Route path={basePath + '/logar'} element={<Logar />} />
            <Route path={basePath + '/cadastrar'} element={<Cadastrar />} />
            <Route path="*" element={<Empty />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  </ThemeProvider>
);
