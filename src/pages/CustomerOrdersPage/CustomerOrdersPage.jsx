import { Checkout, OrdersList } from 'components/Customer';

const CustomerOrdersPage = () => {
  return (
    <div>
      <OrdersList />
      <Checkout />
    </div>
  );
};

export default CustomerOrdersPage;
