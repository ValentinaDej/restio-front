import styles from './TableCard.module.scss';
import PropTypes from 'prop-types';
import { StatusSelector, Text, Button } from 'shared';

import { NavLink } from 'react-router-dom';
import { useChangeTableStatus } from 'api/service';
import { toast } from 'react-hot-toast';

import { GiWoodenChair, GiNotebook } from 'react-icons/gi';
import { BiDish } from 'react-icons/bi';
import { MdTableBar } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { IoIosRestaurant } from 'react-icons/io';
import { motion } from 'framer-motion';

export const TableCard = ({ restaurant_id, table_number, table_id, status, orders, seats }) => {
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

  const getOrderedDishes = (orders) => {
    const readyItems = orders.flatMap((order) =>
      order.orderItems.filter((item) => item.status === 'Ordered')
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
  const orderedDishes = getOrderedDishes(orders);

  const getTotalReadyDishesCount = (orders) => {
    const totalReadyCount = orders.reduce((count, order) => {
      const readyItems = order.orderItems.filter((item) => item.status === 'Ready');
      const readyItemCount = readyItems.reduce((sum, readyItem) => sum + readyItem.quantity, 0);
      return count + readyItemCount;
    }, 0);

    return totalReadyCount;
  };

  const getTotalOrderedDishesCount = (orders) => {
    const totalReadyCount = orders.reduce((count, order) => {
      const readyItems = order.orderItems.filter((item) => item.status === 'Ordered');
      const readyItemCount = readyItems.reduce((sum, readyItem) => sum + readyItem.quantity, 0);
      return count + readyItemCount;
    }, 0);

    return totalReadyCount;
  };

  const amountReadyDishes = getTotalReadyDishesCount(orders);
  const amountOrderedDishes = getTotalOrderedDishesCount(orders);

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
          <AiFillStar
            size={22}
            color="var(--color-gray-300)"
            onMouseOver={({ target }) => (target.style.color = 'var(--color-orange)')}
            onMouseOut={({ target }) => (target.style.color = 'var(--color-gray-300)')}
          />
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
              style={{ background: '#f56e53', border: '2px solid #f56e53', fontSize: '12px' }}
              onClick={() => changeStatus('Taken')}
            >
              Resolve
            </Button>
          </div>
        )}
      </div>
      <div className={styles.line} />
      {status !== 'Free' ? (
        <div className={styles.table__mainBlock}>
          {orders.length > -1 && (
            <div className={styles.table__orders}>
              {status !== 'Free' && (
                <>
                  <div className={styles.table__orders_box}>
                    <div className={styles.table__orders_icon}>
                      <GiNotebook size={30} />
                    </div>
                    <div className={styles.table__orders_list}>
                      <div className={styles.table__order_open}>
                        <Text fontSize={15}>
                          <span className={openOrders !== 0 ? styles.unpaid : styles.disable}>
                            Unpaid
                          </span>
                          {openOrders !== 0 ? openOrders : ''}
                        </Text>
                      </div>

                      <div className={styles.table__order_paid}>
                        <Text fontSize={15}>
                          <span className={paidOrders !== 0 ? styles.paid : styles.disable}>
                            Paid
                          </span>
                          {paidOrders !== 0 ? paidOrders : ''}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className={styles.line} />
                </>
              )}
            </div>
          )}
          {status !== 'Free' && (
            <div className={styles.table__dishes}>
              <div className={styles.table__dishes_box}>
                <div className={styles.table__dishes_icon}>
                  <BiDish size={30} />
                </div>
                <div className={styles.table__dishes_list}>
                  <div className={styles.table__dishes_ordered}>
                    <Text fontSize={15}>
                      <span className={amountOrderedDishes !== 0 ? styles.unpaid : styles.disable}>
                        Ordered
                      </span>
                      {amountOrderedDishes !== 0 ? amountOrderedDishes : ''}
                    </Text>
                  </div>
                  <div className={styles.table__dishes_ready}>
                    <Text fontSize={15}>
                      <span className={amountReadyDishes !== 0 ? styles.ready : styles.disable}>
                        Ready
                      </span>
                      {amountReadyDishes !== 0 ? amountReadyDishes : ''}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.table__emptyState}>
          <IoIosRestaurant size={80} color="var(--color-gray-300)" />
        </div>
      )}

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
