import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import './styles.scss';

const App = () => {
  return (
    <>
      <Header />
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
