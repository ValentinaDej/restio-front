import { Orders } from 'components';
import cls from './TableDishesWaiterPage.module.scss';

const TableDishesWaiterPage = () => {
  return (
    <section className={cls.main}>
      <Orders isWaiter isWaiterDishesPage />
    </section>
  );
};

export default TableDishesWaiterPage;
