import { TotalBlock } from './ui/TotalBlock/TotalBlock';
import cls from './Statisctics.module.scss';
import { TransactionsTable } from './ui/TransactionsTable/TransactionsTable';
import { StatisticsByTransactionsBlock } from './ui/StatisticsByTransactionsBlock/StatisticsByTransactionsBlock';

export const Statisctics = ({ statistics }) => {
  return (
    <div>
      <div className={cls.topCharts}>
        <StatisticsByTransactionsBlock monthlyStatistics={statistics} />
        <TotalBlock monthlyStatistics={statistics} />
      </div>
      <TransactionsTable />
    </div>
  );
};
