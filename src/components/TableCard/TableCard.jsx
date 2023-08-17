import styles from './TableCard.module.scss';
import StatusSelector from 'shared/StatusSelector/StatusSelector';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import Button from 'shared/Button/Button';
import { NavLink } from 'react-router-dom';
import { useChangeTableStatus } from 'api/service';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { GiWoodenChair } from 'react-icons/gi';
import { MdTableBar } from 'react-icons/md';

const TableCard = ({ restaurant_id, table_number, table_id, status, orders, seats }) => {
  const changeTableStatus = useChangeTableStatus();
  const [currentStatus, setCurrentStatus] = useState(status);

  const redAnimation = status === 'Waiting' ? styles.table_pulsating : '';
  const changeStatus = async (item) => {
    try {
      await changeTableStatus.mutateAsync({ status: item, restaurant_id, table_id });
      setCurrentStatus(item);
      return 'success';
    } catch (mutationError) {
      console.error('Mutation Error:', mutationError);
      toast.error(mutationError.response.data.message);
    }
  };

  const paidOrders = orders.filter((order) => order.status === 'Paid').length;
  const openOrders = orders.filter((order) => order.status === 'Open').length;

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

  const getTotalReadyDishesCount = (orders) => {
    const totalReadyCount = orders.reduce((count, order) => {
      const readyItems = order.orderItems.filter((item) => item.status === 'Ready');
      const readyItemCount = readyItems.reduce((sum, readyItem) => sum + readyItem.quantity, 0);
      return count + readyItemCount;
    }, 0);

    return totalReadyCount;
  };

  const amountReadyDishes = getTotalReadyDishesCount(orders);

  return (
    <div className={`${styles.table} ${redAnimation}`}>
      <div className={styles.table__head}>
        <div className={styles.table__number}>
          <MdTableBar size={21} />
          <Text fontSize={20}>{table_number}</Text>
        </div>
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
            <Button size="sm" style={{ width: '95px' }} onClick={() => changeStatus('Taken')}>
              Resolve
            </Button>
          </div>
        )}
      </div>
      <div className={styles.line} />
      <div className={styles.table__mainBlock}>
        {orders.length > 0 && (
          <div className={styles.table__orders}>
            <div className={styles.table__orders_title}>
              <Text fontSize={14}>Orders</Text>
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
            <div className={styles.line} />
          </div>
        )}
        {readyDishes.length > 0 && (
          <div className={styles.table__dishes}>
            <div className={styles.table__dishes_title}>
              <Text fontSize={14}>Dishes</Text>
            </div>
            <div className={styles.table__dishes_content}>
              <Status statusCurrent="Ready" />
              <Text>{amountReadyDishes}</Text>
            </div>
          </div>
        )}
      </div>
      <div className={styles.line}></div>
      <div className={styles.table__bottom}>
        <div className={styles.table__seats}>
          <GiWoodenChair size={21} />
          <Text fontSize={20}>{seats}</Text>
        </div>

        <div className={styles.table__btn_details}>
          <NavLink to={table_id}>
            <Button size="sm" mode="outlined">
              Details
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
