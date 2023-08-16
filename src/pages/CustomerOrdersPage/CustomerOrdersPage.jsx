import Orders from 'components/Orders/Orders';
import cls from './CustomerOrdersPage.module.scss';

const CustomerOrdersPage = () => {
  return (
    <main className={cls.main}>
      <Orders isSmall />
    </main>
  );
};

export default CustomerOrdersPage;
