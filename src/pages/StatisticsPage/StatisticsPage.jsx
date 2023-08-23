import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import cls from './StatisticsPage.module.scss';
import { Statisctics } from 'components';
import { DropDown, Loader, Title } from 'shared';
import { useGetTransactionsStatistics } from 'api/transactions';

const StatisticsPage = () => {
  const [searchParams] = useSearchParams();
  const { restId } = useParams();
  const [timestamp, setTimestamp] = useState(searchParams.get('timestamp') || 'month');
  const { data: data, isLoading, refetch } = useGetTransactionsStatistics(restId, timestamp);

  useEffect(() => {
    if (timestamp) {
      refetch();
    }
  }, [refetch, timestamp]);

  const capitalizedTimestamp = timestamp.charAt(0).toUpperCase() + timestamp.slice(1);

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
              defaultValue={capitalizedTimestamp}
            />
          </span>
          <Statisctics statistics={data?.data?.statistics} timestamp={timestamp} />
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
