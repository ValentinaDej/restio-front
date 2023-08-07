import Orders from 'components/Orders/Orders';
import cls from './CustomerOrdersPage.module.scss';

const CustomerOrdersPage = () => {
  return (
    <div className={cls.main}>
      <Orders />
    </div>
  );
};

export default CustomerOrdersPage;
