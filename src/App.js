import './styles.scss';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Button from './shared/Button/Button';
import { IconButton } from 'shared/IconButton/IconButton';

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            <Button>Start</Button>
            <IconButton size={33} Svg={BiAddToQueue} disabled={true} mode={'outlined'} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
