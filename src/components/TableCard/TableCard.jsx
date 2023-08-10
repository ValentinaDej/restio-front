import styles from './TableCard.module.scss';
import StatusSelector from 'shared/StatusSelector/StatusSelector';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import { NavLink } from 'react-router-dom';
import { useChangeTableStatus } from 'api/service';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const TableCard = ({ restaurant_id, table_number, table_id, status, orders }) => {
  // const queryClient = useQueryClient();
  const changeTableStatus = useChangeTableStatus();
  const [currentStatus, setCurrentStatus] = useState(status);

  const redAnimation = currentStatus === 'Waiting' ? styles.table_pulsating : '';
  const changeStatus = async (item) => {
    try {
      await changeTableStatus.mutateAsync({ status: item, restaurant_id, table_id });
      // queryClient.invalidateQueries('tablesByRestaurantId');
      // queryClient.invalidateQueries('ordersByRestaurantId');
      setCurrentStatus(item);
      return 'success';
    } catch (mutationError) {
      console.error('Mutation Error:', mutationError);
      toast.error(mutationError.response.data.message);
    }
  };

  // console.log(orders);
  const paidOrders = orders.filter((order) => order.status === 'Paid').length;
  const openOrders = orders.filter((order) => order.status === 'Open').length;
  // console.log(paidOrders);
  // console.log(openOrders);

  // const getReadyDishes = (orders) => {
  //   const readyDishes = orders.flatMap((order) =>
  //     order.orderItems
  //       .filter((item) => item.status === 'Ready')
  //       .map((item) => ({
  //         name: item.dish.name,
  //         quantity: item.quantity,
  //       }))
  //   );

  //   return readyDishes;
  // };

  const getReadyDishes = (orders) => {
    const readyItems = orders.flatMap((order) =>
      order.orderItems.filter((item) => item.status === 'Ready')
    );

    const readyDishes = readyItems.reduce((result, readyItem) => {
      const existingDish = result.find((dish) => dish.name === readyItem.dish.name);

      if (existingDish) {
        existingDish.quantity += readyItem.quantity;
      } else {
        result.push({ name: readyItem.dish.name, quantity: readyItem.quantity });
      }

      return result;
    }, []);

    return readyDishes;
  };

  const readyDishes = getReadyDishes(orders);

  // console.log(readyDishes);

  return (
    <div className={`${styles.table} ${redAnimation}`}>
      {status !== 'Waiting' ? (
        <div className={styles.table__status}>
          <StatusSelector
            mode="tables"
            currentStatus={status}
            size="lg"
            statusSize="lg"
            changeStatusFunction={changeStatus}
          />
        </div>
      ) : (
        <div className={styles.table__resolve_btn}>
          <Button size="sm" style={{ width: '100%' }} onClick={() => changeStatus('Taken')}>
            Resolve waiting
          </Button>
        </div>
      )}

      <div className={styles.table__body}>
        <Text fontSize={20}>Table # {table_number}</Text>
        <NavLink to={table_id}>
          <Button size="sm" mode="outlined">
            Details
          </Button>
        </NavLink>
      </div>
      <div className={styles.line}></div>
      {/* <ul className={styles.table__list}>
        {orders?.map((order, index) => (
          <li className={styles.table__item} key={order._id}>
            <Text fontSize={14}>Order # {index + 1}</Text>
            <Status statusCurrent={order.status} statusSize="sm" />
          </li>
        ))}
      </ul> */}
      {orders.length > 0 && (
        <div className={styles.table__orders}>
          <div className={styles.table__orders_title}>
            <Text>Orders</Text>
          </div>
          <div className={styles.table__orders_list}>
            {openOrders > 0 && (
              <div className={styles.table__order}>
                <Status statusCurrent="Open" statusSize="sm" />
                <Text>{openOrders}</Text>
              </div>
            )}
            {paidOrders > 0 && (
              <div className={styles.table__order}>
                <Status statusCurrent="Paid" statusSize="sm" />
                <Text>{paidOrders}</Text>
              </div>
            )}
          </div>
          <div className={styles.line}></div>
        </div>
      )}
      {readyDishes.length > 0 && (
        <div className={styles.table__dishes}>
          <div className={styles.table__dishes_title}>
            <Text>Dishes</Text>
          </div>
          <ul className={styles.table__dishes_list}>
            {readyDishes.map((readyDish, index) => (
              <li key={index} className={styles.table__dishes_item}>
                <Status statusCurrent="Ready" />
                <Text fontSize={14}>{readyDish.name}</Text>
                <Text fontSize={14}>{readyDish.quantity}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableCard;
