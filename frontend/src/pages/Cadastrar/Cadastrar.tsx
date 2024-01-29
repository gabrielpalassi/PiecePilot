import SignUp from '../../components/SignUp/SignUp';

function Cadastrar(): JSX.Element {
  return (
    <div>
      {/* Conteúdo da página de login */}
      <section className='login-section'>
        <div className='text-div'>
          <div className='title'>Bem-vindo!</div>
          <div className='description'>Forneça seus dados para cadastro.</div>
            <SignUp />
        </div>
      </section>
    </div>
  );
}

export default Cadastrar;
