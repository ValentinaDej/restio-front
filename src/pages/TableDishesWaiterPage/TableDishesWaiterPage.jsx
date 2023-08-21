import { Orders } from 'components';
import cls from './TableDishesWaiterPage.module.scss';

const TableDishesWaiterPage = () => {
  return (
    <main className={cls.main}>
      <Orders isWaiter isWaiterDishesPage />
    </main>
  );
};

export default TableDishesWaiterPage;
