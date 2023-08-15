import Orders from 'components/Orders/Orders';
import cls from './CustomerOrdersPage.module.scss';

const CustomerOrdersPage = () => {
  return (
    <div className={cls.main}>
      <Orders isSmall />
    </div>
  );
};

export default CustomerOrdersPage;
