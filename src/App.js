import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import './styles.scss';
import { IconButton } from 'shared/IconButton/IconButton';
import { BiAddToQueue } from 'react-icons/bi';

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
