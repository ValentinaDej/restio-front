import Orders from 'components/Orders/Orders';
import cls from './TableWaiterPage.module.scss';

const TableWaiterPage = () => {
  return (
    <div className={cls.main}>
      <Orders isWaiter />
    </div>
  );
};

export default TableWaiterPage;
