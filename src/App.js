import './styles.scss';
import Footer from './shared/Footer/Footer';
import Header from './shared/Header/Header';
import Button from './shared/Button/Button';
import { Toaster } from 'react-hot-toast';
import { Checkout, OrdersList } from 'components/Customer';

import HomePage from 'pages/HomePage/HomePage';

const App = () => {
  return (
    // <>
    //   <div>
    //     <Toaster />
    //   </div>
    //   <Header role="customer" />
    //   <main className="main">
    //     <div className="main__container">
    //       <h1>RESTio</h1>
    //       <div className="centered">
    //         <Button>Start</Button>
    //       </div>
    //     </div>
    //   </main>
    //   <Footer />
    // </>
    <>
      <OrdersList />
      <Checkout />
      <HomePage />
    </>
  );
};

export default App;
