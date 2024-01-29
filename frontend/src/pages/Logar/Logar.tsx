import React from 'react';
import { Link } from 'react-router-dom';
import basePath from '../../constants/BasePath';
import SignIn from '../../components/SignIn/SignIn';

function Logar(): JSX.Element {
  return (
    <div>
      {/* Conteúdo da página de login */}
      <section className='login-section'>
        <div className='text-div'>
          <div className='title'>Bem-vindo de volta!</div>
          <div className='description'>Faça login para acessar sua conta.</div>
            <SignIn />
        </div>
      </section>
    </div>
  );
}

export default Logar;
