import './styles.scss';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Button from './shared/Button/Button';

const App = () => {
  return (
    <>
      <Header role="customer" />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            <Button>Start</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
