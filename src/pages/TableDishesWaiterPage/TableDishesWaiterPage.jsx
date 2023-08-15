import Orders from 'components/Orders/Orders';
import cls from './TableDishesWaiterPage.module.scss';

const TableDishesWaiterPage = () => {
  return (
    <div className={cls.main}>
      <Orders isWaiter isDishesPage />
    </div>
  );
};

export default TableDishesWaiterPage;
