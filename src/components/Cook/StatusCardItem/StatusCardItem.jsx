import Status from 'shared/Status/Status';
import DishesList from '../DishesList/DishesList';
import styles from './StatusCardItem.module.scss';
import { useCallback } from 'react';

const StatusCardItem = ({ data, status, handleChangeStatus }) => {
  const filterDishes = useCallback((status, orderItems) => {
    return orderItems.filter((item) => item.status === status);
  }, []);

  return (
    <div className={`${styles.status__card}`}>
      <Status statusCurrent={status} className={`${styles.status__title}`} />
      {data?.length > 0 && (
        <ul className={`${styles.list}`}>
          {data.map(
            (order) =>
              filterDishes(status, order.orderItems)?.length > 0 && (
                <li className={`${styles.item}`} key={order._id}>
                  <p className={`${styles.item__title}`}>Order # {order._id}</p>
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
  );
};

export default StatusCardItem;
