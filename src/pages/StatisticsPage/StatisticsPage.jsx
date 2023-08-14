import { useGetStatistics } from 'api/restaurant';
import { useParams } from 'react-router-dom';
import Loader from 'shared/Loader/Loader';
import cls from './StatisticsPage.module.scss';
import { Statisctics } from 'components/Statistics/Statisctics';
import { DropDown } from 'shared/DropDown/DropDown';
import { useEffect, useState } from 'react';

const StatisticsPage = () => {
  const { restId } = useParams();
  const [timestamp, setTimestamp] = useState('month');
  const { data: data, isLoading, refetch } = useGetStatistics(restId, timestamp);

  useEffect(() => {
    if (timestamp) {
      refetch();
    }
  }, [refetch, timestamp]);

  return (
    <div className={cls.main}>
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
