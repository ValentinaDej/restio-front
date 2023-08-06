import { useParams } from 'react-router-dom';
import Title from 'shared/Title/Title';
import styles from './DishesForCookPage.module.scss';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loader from 'shared/Loader/Loader';
import { getAllOrders } from 'api/order';
import { changeDishStatus } from 'api/dish';
import StatusCardItem from 'components/Cook/StatusCardItem/StatusCardItem';

const statuses = ['Ordered', 'In progress', 'Ready'];

const DishesForCookPage = () => {
  const { restId } = useParams();

  const { data, isLoading, refetch } = useQuery(
    'all dishes by restaurant',
    async () => getAllOrders(restId),
    {
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const { mutateAsync } = useMutation(changeDishStatus);

  const handleChangeStatus = async (id, orderId, dishId, status) => {
    try {
      await toast.promise(
        mutateAsync({
          id,
          orderId,
          dishId,
          status,
        }),
        {
          loading: 'Loading...',
          success: `Dish change status to ${status}`,
          error: 'Error change status',
        }
      );
      await refetch();
    } catch (error) {
      console.error('Error change dish status:', error);
    }
  };

  return (
    <div className="main__container">
      <div className={`${styles.container}`}>
        <Title classname={`${styles.title}`}>Cook Dashboard</Title>
        {isLoading ? (
          <Loader size="lg" />
        ) : (
          <div className={`${styles.status__container}`}>
            {statuses.map((status) => (
              <StatusCardItem
                key={status}
                status={status}
                data={data}
                handleChangeStatus={handleChangeStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DishesForCookPage;
