import { Link } from "react-router-dom";
import basePath from "../../constants/BasePath";
import EmptyPageImage from "../../assets/empty-page.png";

function Empty(): JSX.Element {
  return (
    <section className='banner-section'>
      <div className='text-div'>
        <div className='title'>Oops!</div>
        <div className='description'>Parece que a página que você está procurando não existe. Você pode tentar voltar ao início, ou, se acreditar que isso seja um erro, contatar o administrador de seu sistema.</div>
        {/* Button back to start */}
        <Link to={basePath ? basePath : '/'}>
          <button>Voltar ao início</button>
        </Link>
      </div>
      <img src={EmptyPageImage} alt='Montagem de computadores'></img>
    </section>
  );
};

export default Empty;
