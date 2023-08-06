import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from 'shared/Title/Title';
import styles from './DishesForCookPage.module.scss';
import Status from 'shared/Status/Status';
import DishesList from 'components/Cook/DishesList/DishesList';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loader from 'shared/Loader/Loader';

const statuses = ['Ordered', 'In progress', 'Ready'];

const DishesForCookPage = () => {
  const { restId } = useParams();

  const fetchDishes = async () => {
    const request = await axios.get(`http://localhost:3001/orders/${restId}`);
    const { orders } = request.data.data;
    return orders;
  };

  const { data, isLoading, refetch } = useQuery('fetchDishes', fetchDishes, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync } = useMutation((dishId, orderId, status) => {
    axios.patch(`http://localhost:3001/orders/${restId}/${orderId}/${dishId}`, {
      status,
    });
  });

  const handleChangeStatus = async (dishId, orderId, status) => {
    try {
      console.log('order', orderId);
      await toast.promise(mutateAsync(dishId, orderId, status), {
        loading: 'Loading...',
        success: `Dish change status to ${status}`,
        error: 'Error change status',
      });
      await refetch();
    } catch (error) {
      console.error('Error change dish status:', error);
    }
  };

  const filterDishes = (status, orderItems) => {
    return orderItems.filter((item) => item.status === status);
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
              <div key={status} className={`${styles.status__card}`}>
                <Status statusCurrent={status} className={`${styles.status__title}`} />

                {data.length > 0 && (
                  <ul className={`${styles.list}`}>
                    {data.map(
                      (order) =>
                        filterDishes(status, order.orderItems)?.length > 0 && (
                          <li className={`${styles.item}`} key={order._id}>
                            <p>Order # {order._id}</p>
                            <DishesList
                              dishes={filterDishes(status, order.orderItems)}
                              handleChangeStatus={handleChangeStatus}
                              orderId={order._id}
                            />
                          </li>
                        )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DishesForCookPage;
