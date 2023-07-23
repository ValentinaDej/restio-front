import './styles.scss';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Button from './shared/Button/Button';

import Card from 'shared/Card/Card';

const App = () => {
  return (
    <>
      <Header role="customer" />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            <Card mode="cart" />

            {/* <Button>Start</Button> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
