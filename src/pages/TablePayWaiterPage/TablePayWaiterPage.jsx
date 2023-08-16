import Orders from 'components/Orders/Orders';
import cls from './TablePayWaiterPage.module.scss';

const TablePayWaiterPage = () => {
  return (
    <main className={cls.main}>
      <Orders isWaiter isSmall />
    </main>
  );
};

export default TablePayWaiterPage;
