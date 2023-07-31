import { Checkout, OrdersList } from 'components/Customer';
import { useSelector } from 'react-redux';
import { getOrders } from 'store/customer/orders/selectors';

const CustomerOrdersPage = () => {
  const orders = useSelector(getOrders);

  return (
    <div>
      <OrdersList orders={orders} />
      <Checkout />
    </div>
  );
};

export default CustomerOrdersPage;
