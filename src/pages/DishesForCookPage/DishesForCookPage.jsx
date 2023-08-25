import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSSE } from 'react-hooks-sse';

import { Title, Button, Loader } from 'shared';
import { StatusCardItem } from 'components';
import { getAllOrders, useUpdateDishStatusByWaiter } from 'api/order';
import styles from './DishesForCookPage.module.scss';

const statuses = ['Ordered', 'In progress', 'Ready'];

const DishesForCookPage = () => {
  const { restId } = useParams();

  const [currentStatus, setCurrentStatus] = useState('Ordered');
  const createNewOrderEvent = useSSE('new order', {});
  const { data, isLoading, refetch } = useQuery(
    ['orders'],
    async () => await getAllOrders(restId),
    {
      onError: (error) => {
        toast.error(error.message);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (createNewOrderEvent && createNewOrderEvent.message) {
      refetch({ force: true });
    }
  }, [createNewOrderEvent, refetch]);

  const isMobile = useMediaQuery({
    query: '(max-width: 767.98px)',
  });

  const { mutate } = useUpdateDishStatusByWaiter();

  const handleChangeStatus = (restId, orderId, dishId, status, name) => {
    mutate({ urlParams: { restId }, status, dishId, orderId });
    toast.success(`Dish ${name} change status to ${status}`);
  };

  const filterDishes = useCallback(
    (status) => {
      return data?.filter((item) => item.status === status);
    },
    [data]
  );

  return (
    <div className={`${styles.main__section}`}>
      <Title classname={`${styles.title}`}>Cook Dashboard</Title>
      <hr className={`${styles.divider}`} />
      {isLoading ? (
        <div className={`${styles.loader__section}`}>
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <div className={`${styles.button__section}`}>
            {statuses.map((status) => (
              <Button
                key={`btn_${status}`}
                size={isMobile ? 'sm' : 'md'}
                mode={currentStatus === status ? 'primary' : 'outlined'}
                onClick={() => setCurrentStatus(status)}
                className={`${styles.button}`}
              >
                {status}
              </Button>
            ))}
          </div>

          <div>
            {data?.length > 0 &&
              statuses.map(
                (status) =>
                  currentStatus === status && (
                    <StatusCardItem
                      key={status}
                      status={status}
                      data={filterDishes(status)}
                      handleChangeStatus={handleChangeStatus}
                    />
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default DishesForCookPage;
