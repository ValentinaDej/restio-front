import Text from 'shared/Text/Text';
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
  const totaByYear = monthlyStatistics.reduce((acc, el) => el.amount + acc, 0);
  return (
    <div className={cls.box}>
      <Title fontSize={22}>Total earnings by year ${formatNumberWithTwoDecimals(totaByYear)}</Title>
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
          <Area type="monotone" dataKey="amount" stroke="#ea6a12" fill="rgba(248, 156, 95, 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
