import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { memo } from 'react';
import { Title } from 'shared';
import cls from './TotalBlock.module.scss';

export const TotalBlock = memo(({ monthlyStatistics }) => {
  const data = monthlyStatistics;
  const total = data?.reduce((acc, el) => formatNumberWithTwoDecimals(el.amount) + acc, 0);
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
            stroke={'var(--color-primary)'}
            fill={'var(--color-green-accent)'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
