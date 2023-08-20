import { useParams } from 'react-router-dom';

import cls from './StatisticsPage.module.scss';
import { Statisctics } from 'components';
import { DropDown, Loader, Title } from 'shared';
import { useEffect, useState } from 'react';

import { useGetTransactionsStatistics } from 'api/transactions';

const StatisticsPage = () => {
  const { restId } = useParams();
  const [timestamp, setTimestamp] = useState('month');
  const { data: data, isLoading, refetch } = useGetTransactionsStatistics(restId, timestamp);

  useEffect(() => {
    if (timestamp) {
      refetch();
    }
  }, [refetch, timestamp]);

  return (
    <div className={cls.main}>
      <Title textAlign={'left'}>Statisctics</Title>
      <hr className={cls.divider} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <span className={cls.span}>
            Get statisctics by
            <DropDown
              options={[
                { value: 'year', label: 'Year' },
                { value: 'month', label: 'Month' },
                { value: 'week', label: 'Week' },
              ]}
              onSelect={(e) => {
                setTimestamp(e.value);
              }}
              defaultValue="Month"
            />
          </span>
          <Statisctics statistics={data?.data?.statistics} />
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
