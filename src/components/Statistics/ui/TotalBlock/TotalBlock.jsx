import Title from 'shared/Title/Title';
import cls from './TotalBlock.module.scss';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { memo } from 'react';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';

export const TotalBlock = memo(({ monthlyStatistics }) => {
  const data = monthlyStatistics;
  const total = data?.reduce((acc, el) => el.amount + acc, 0);
  return (
    <div className={cls.box}>
      <Title fontSize={22}>Total earnings ${formatNumberWithTwoDecimals(total)}</Title>
      <ResponsiveContainer width="100%" height={462}>
        <AreaChart
          width={500}
          height={480}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={'var(--color-gray)'}
            fill={'var(--color-bg-dark)'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
