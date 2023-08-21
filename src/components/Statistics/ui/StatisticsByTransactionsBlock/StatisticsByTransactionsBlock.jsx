import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Title } from 'shared';
import cls from './StatisticsByTransactionsBlock.module.scss';

export const StatisticsByTransactionsBlock = memo(({ monthlyStatistics }) => {
  const data = monthlyStatistics;
  const transactions = data?.reduce((acc, el) => el.transactions + acc, 0);

  return (
    <div className={cls.box}>
      <Title fontSize={22}>Number of transactions {transactions}</Title>
      <ResponsiveContainer width="100%" height={485}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cash" fill="#69a6ce" />
          <Bar dataKey="pos" fill="#12cdea" />
          <Bar dataKey="online" fill="#eab012" />
          <Bar dataKey="transactions" fill={'var(--color-primary)'} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
