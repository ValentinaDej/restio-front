import styles from './TableCard.module.scss';
import PropTypes from 'prop-types';
import StatusSelector from 'shared/StatusSelector/StatusSelector';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import Button from 'shared/Button/Button';
import { NavLink } from 'react-router-dom';
import { useChangeTableStatus } from 'api/service';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { GiWoodenChair } from 'react-icons/gi';
import { MdTableBar } from 'react-icons/md';
import { AiTwotoneStar } from 'react-icons/ai';
import { motion } from 'framer-motion';

const TableCard = ({ restaurant_id, table_number, table_id, status, orders, seats }) => {
  const changeTableStatus = useChangeTableStatus();
  // const [currentStatus, setCurrentStatus] = useState(status);

  // const redAnimation = currentStatus === 'Waiting' ? styles.table_pulsating : '';
  // console.log(status);
  // console.log(currentStatus);
  // console.log(styles.table);

  const changeStatus = async (item) => {
    try {
      await changeTableStatus.mutateAsync({ status: item, restaurant_id, table_id });
      // setCurrentStatus(item);
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
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      // className={`${styles.table} ${redAnimation}`}
      // ${classes[`button_${buttonSize}`]}
      className={`${styles.table} ${styles[`table_${status}`]}`}
    >
      <div className={styles.table__head}>
        <div className={styles.table__favorites}>
          <AiTwotoneStar size={22} color="var(--color-gray-300)" />
        </div>
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
          <div className={styles.table__resolve_btn_div}>
            <Button
              size="sm"
              style={{ background: '#f74545', border: '2px solid #f74545' }}
              onClick={() => changeStatus('Taken')}
            >
              Resolve
            </Button>
          </div>
        )}
      </div>
      <div className={styles.line} />
      <div className={styles.table__mainBlock}>
        {orders.length > 0 && (
          <div className={styles.table__orders}>
            <div className={styles.table__orders_list}>
              {openOrders > 0 && (
                <div className={styles.table__order_open}>
                  <Text fontSize={15}>
                    <span className={styles.unpaid}>Unpaid</span> orders: {openOrders}
                  </Text>
                </div>
              )}
              {paidOrders > 0 && (
                <div className={styles.table__order_paid}>
                  <Text fontSize={15}>
                    <span className={styles.paid}>Paid</span> orders: {paidOrders}
                  </Text>
                </div>
              )}
            </div>
            <div className={styles.line} />
          </div>
        )}
        {readyDishes.length > 0 && (
          <div className={styles.table__dishes}>
            <div className={styles.table__dishes_text}>
              <Text fontSize={15}>
                <span className={styles.ready}>Ready</span> dishes to serve: {amountReadyDishes}
              </Text>
            </div>
          </div>
        )}
      </div>
      <div className={styles.line}></div>
      <div className={styles.table__bottom}>
        <div className={styles.table__btn_view_div}>
          <NavLink to={`${table_id}/dishes`}>
            <Button size="sm" mode="outlined" className={styles.table__btn_view}>
              View Orders & Status
            </Button>
          </NavLink>
        </div>
        <div className={styles.table__bot}>
          <div className={styles.table__seats}>
            <GiWoodenChair size={21} />
            <Text fontSize={20}>{seats}</Text>
          </div>
          <div className={styles.table__btn_details}>
            <NavLink to={`${table_id}/pay`}>
              <Button size="sm" mode="outlined">
                To payments
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

TableCard.propTypes = {
  restaurant_id: PropTypes.string,
  table_number: PropTypes.number,
  table_id: PropTypes.string,
  status: PropTypes.string,
  orders: PropTypes.array,
  seats: PropTypes.number,
};

export default TableCard;
