import Orders from 'components/Orders/Orders';
import cls from './TablePayWaiterPage.module.scss';

const TablePayWaiterPage = () => {
  return (
    <div className={cls.main}>
      <Orders isWaiter isSmall />
    </div>
  );
};

export default TablePayWaiterPage;
