import { Orders } from 'components';
import cls from './CustomerOrdersPage.module.scss';

const CustomerOrdersPage = () => {
  return (
    <section className={cls.main}>
      <Orders isSmall />
    </section>
  );
};

export default CustomerOrdersPage;
