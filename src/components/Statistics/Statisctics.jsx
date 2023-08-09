import { StatisticsByYearBox } from './ui/StatisticsByYearBox/StatisticsByYearBox';
import { TotalBlock } from './ui/TotalBlock/TotalBlock';
import cls from './Statisctics.module.scss';
import { TransactionsTable } from './ui/TransactionsTable/TransactionsTable';
export const Statisctics = ({ monthlyStatistics }) => {
  return (
    <div>
      <div className={cls.topCharts}>
        <StatisticsByYearBox monthlyStatistics={monthlyStatistics} />
        <TotalBlock monthlyStatistics={monthlyStatistics} />
      </div>
      <TransactionsTable />
    </div>
  );
};
