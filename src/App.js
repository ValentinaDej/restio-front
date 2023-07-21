import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import './styles.scss';
import { IconButton } from './shared/IconButton/IconButton';
import { BiSolidTrash } from 'react-icons/bi';
import { CheckBox } from './shared/CheckBox/CheckBox';

const App = () => {
  const click = () => {
    console.log(1);
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            <IconButton Svg={BiSolidTrash} onClick={click} />
            <Button>Start</Button>
            <CheckBox />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
