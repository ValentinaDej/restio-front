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
import cls from './StatisticsByTransactionsBlock.module.scss';
import Title from 'shared/Title/Title';

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
          <Bar dataKey="cash" fill="#3bb77e" />
          <Bar dataKey="pos" fill="#12cdea" />
          <Bar dataKey="online" fill="#eab012" />
          <Bar dataKey="transactions" fill="#ea6a12" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
