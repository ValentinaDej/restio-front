import { useGetStatistics } from 'api/restaurant';
import { useParams } from 'react-router-dom';
import Loader from 'shared/Loader/Loader';
import cls from './StatisticsPage.module.scss';
import { Statisctics } from 'components/Statistics/Statisctics';

const StatisticsPage = () => {
  const { restId } = useParams();
  const { data: data, isLoading } = useGetStatistics(restId);

  return (
    <div className={cls.main}>
      {isLoading ? <Loader /> : <Statisctics monthlyStatistics={data?.data.statistics} />}
    </div>
  );
};

export default StatisticsPage;
