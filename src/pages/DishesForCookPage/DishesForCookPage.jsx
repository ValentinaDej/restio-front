import { useParams } from 'react-router-dom';
import Title from 'shared/Title/Title';
import styles from './DishesForCookPage.module.scss';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loader from 'shared/Loader/Loader';
import { getAllOrders, useUpdateDishStatusByWaiter } from 'api/order';
import StatusCardItem from 'components/Cook/StatusCardItem/StatusCardItem';
import { useMediaQuery } from 'react-responsive';
import Button from 'shared/Button/Button';
import { useCallback, useState } from 'react';

const statuses = ['Ordered', 'In progress', 'Ready'];

const DishesForCookPage = () => {
  const { restId } = useParams();
  const [currentStatus, setCurrentStatus] = useState('Ordered');

  const { data, isLoading } = useQuery(['orders'], async () => getAllOrders(restId), {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchOnWindowFocus: false, // Disable refetching when the window gains focus
    refetchOnReconnect: false, // Disable refetching when the network reconnects
    refetchInterval: false, // Disable automatic periodic refetching
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const { mutate } = useUpdateDishStatusByWaiter();

  const handleChangeStatus = (restId, orderId, dishId, status) => {
    mutate({ urlParams: { restId }, status, dishId, orderId });
  };

  const filterDishes = useCallback(
    (status) => {
      return data.filter((item) => item.status === status);
    },
    [data]
  );

  return (
    <div className="main__container">
      <div className={`${styles.section}`}>
        <Title classname={`${styles.title}`}>Cook Dashboard</Title>
        {isLoading ? (
          <Loader size="lg" />
        ) : (
          <>
            {isTablet && (
              <div className={`${styles.button__section}`}>
                {statuses.map((status) => (
                  <Button
                    key={`btn_${status}`}
                    size={isMobile ? 'sm' : 'md'}
                    mode={currentStatus === status ? 'primary' : 'outlined'}
                    onClick={() => setCurrentStatus(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            )}

            <div className={`${styles.status__section}`}>
              {statuses.map((status) => {
                if (isTablet && currentStatus === status) {
                  return (
                    <StatusCardItem
                      key={status}
                      status={status}
                      data={filterDishes(status)}
                      handleChangeStatus={handleChangeStatus}
                    />
                  );
                }
                if (isDesktop) {
                  return (
                    <StatusCardItem
                      key={status}
                      status={status}
                      data={filterDishes(status)}
                      handleChangeStatus={handleChangeStatus}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DishesForCookPage;
