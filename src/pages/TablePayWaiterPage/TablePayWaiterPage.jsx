import { Orders } from 'components';
import cls from './TablePayWaiterPage.module.scss';

const TablePayWaiterPage = () => {
  return (
    <section className={cls.main}>
      <Orders isWaiter isSmall />
    </section>
  );
};

export default TablePayWaiterPage;
