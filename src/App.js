import './styles.scss';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Button from './shared/Button/Button';
import { Toaster } from 'react-hot-toast';
import Checkout from 'components/OrderList/ui/Checkout/Checkout';
import { OrderList } from 'components/OrderList';

const App = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Header role="customer" />
      <main className="main">
        <div className="main__container">
          <h1>RESTio</h1>
          <div className="centered">
            {/* <Button>Start</Button> */}
            <OrderList />
            <Checkout />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
