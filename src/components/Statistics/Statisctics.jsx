import { TotalBlock } from './ui/TotalBlock/TotalBlock';
import { TransactionsTable } from './ui/TransactionsTable/TransactionsTable';
import { StatisticsByTransactionsBlock } from './ui/StatisticsByTransactionsBlock/StatisticsByTransactionsBlock';
import cls from './Statisctics.module.scss';

export const Statisctics = ({ statistics, timestamp }) => {
  return (
    <div>
      <div className={cls.topCharts}>
        <StatisticsByTransactionsBlock monthlyStatistics={statistics} />
        <TotalBlock monthlyStatistics={statistics} />
      </div>
      <TransactionsTable timestamp={timestamp} />
    </div>
  );
};
