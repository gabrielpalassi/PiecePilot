import './index.scss';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './styles/theme';
import './styles/shared.scss';
import Header from './components/Header/Header';
import Inicio from './pages/Inicio/Inicio';
import Montagem from './pages/Montagem/Montagem';
import Avulsas from './pages/Avulsas/Avulsas';
import Gestão from './pages/Gestão/Gestão';
import Empty from './pages/Empty/Empty';
import Carrinho from './pages/Carrinho/Carrinho';
import CartProvider from './providers/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path={'/'} element={<Inicio />} />
            <Route path={'/montagem'} element={<Montagem />} />
            <Route path={'/avulsas'} element={<Avulsas />} />
            <Route path={'/gestao'} element={<Gestão />} />
            <Route path={'/carrinho'} element={<Carrinho />} />
            <Route path="*" element={<Empty />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  </ThemeProvider>
);
