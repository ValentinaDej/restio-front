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

import cls from './StatisticsByYearBox.module.scss';
import Title from 'shared/Title/Title';

export const StatisticsByYearBox = memo(({ monthlyStatistics }) => {
  const data = monthlyStatistics;
  return (
    <div className={cls.box}>
      <Title color="#303c6c" fontSize={22}>
        Transactions/Amonut per month for this year
      </Title>
      <ResponsiveContainer width="100%" height="100%">
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
          <Bar dataKey="amount" fill="#ea6a12" />
          <Bar dataKey="transactions" fill="#3bb77e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
