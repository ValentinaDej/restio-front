import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSSE } from 'react-hooks-sse';
import { Checkout } from 'components/Orders/ui/Checkout/Checkout';
import { OrdersList } from 'components/Orders/ui/OrdersList/OrdersList';
import OrderListSkeleton from 'shared/Skeletons/OrderSkeleton/OrderSkeleton';
import PropTypes from 'prop-types';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useGetOrdersByTableId } from 'api/order';
import { NavigateButtons } from './ui/NavigateButtons/NavigateButtons';
import { EmptyListBox } from './ui/EmptyListBox/EmptyListBox';
import { ListTopBox } from './ui/ListTopBox/ListTopBox';
import { classNames } from 'helpers/classNames';
import { motion, AnimatePresence } from 'framer-motion';

import cls from './Order.module.scss';
import Title from 'shared/Title/Title';

const Orders = ({ isWaiter, isSmall, isWaiterDishesPage }) => {
  const [sortOrderBy, setSortOrderBy] = useState('None');
  const [paymentType, setPaymentType] = useState('');
  const [isMounted, setIsMounted] = useState(true);
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allOrderPrice, setAllOrderPrice] = useState(0);
  const [notServedDishes, setNotServedDishes] = useState(0);
  const [notPaidOrders, setNotPaidOrders] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAllOrdersPaid, setIsAllOrdersPaid] = useState(false);
  const params = useParams();
  const { tableId } = params;

  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(formatNumberWithTwoDecimals(price));
    setSelectedOrders(selectedOrders);
  };
  const updateDishStatusEvent = useSSE('dish status');

  const { data: { data } = {}, isError, isLoading, refetch } = useGetOrdersByTableId(params);

  useEffect(() => {
    if (updateDishStatusEvent && updateDishStatusEvent.message) {
      const table_id = updateDishStatusEvent.message.replace(/"/g, '');
      if (table_id === tableId) {
        refetch({ force: true });
      }
    }
  }, [updateDishStatusEvent, refetch, tableId]);

  const onChangeTypeOfPay = useCallback((e) => {
    const value = e.target.ariaLabel;
    const checked = e.target.checked;
    if (value === 'cash') {
      setPaymentType('cash');
    }
    if (value === 'POS') {
      setPaymentType('POS');
    }
    if (!checked) {
      setPaymentType('');
    }
  }, []);

  useEffect(() => {
    if (data) {
      let notServedDishes = 0;
      let allOrderPrice = 0;
      let newTotalPrice = 0;
      let isAllOrdersPaid = true;
      let notPaidOrders = 0;

      data.orders.forEach((order) => {
        if (order.status !== 'Paid') {
          notPaidOrders += 1;
        }
        order.orderItems.forEach((item) => {
          if (item.status !== 'Served') {
            notServedDishes += item.quantity;
          }
          const itemPrice = item.dish.price * item.quantity;
          if (order.status !== 'Paid') {
            newTotalPrice += itemPrice;
          }

          allOrderPrice += itemPrice;

          if (!(order.status === 'Paid' && item.status === 'Served')) {
            isAllOrdersPaid = false;
          }
        });
      });

      setNotServedDishes(notServedDishes);
      setAllOrderPrice(allOrderPrice);
      setNotPaidOrders(notPaidOrders);
      setTotalPrice(formatNumberWithTwoDecimals(newTotalPrice));
      setIsAllOrdersPaid(isAllOrdersPaid);
      setIsMounted(false);
    }
  }, [data]);

  return (
    <>
      {isWaiter && (
        <>
          <Title textAlign={'left'}>
            {isWaiterDishesPage ? 'Orders dishes' : 'Orders payments'}
          </Title>
          <hr className={cls.divider} />
        </>
      )}
      <section className={cls.section}>
        <NavigateButtons
          params={params}
          isWaiter={isWaiter}
          notServedDishes={notServedDishes}
          notPaidOrders={notPaidOrders}
          setSortOrderBy={setSortOrderBy}
        />
        {isLoading || isMounted ? (
          <OrderListSkeleton
            isWaiter={isWaiter}
            isSmall={isSmall}
            isWaiterDishesPage={isWaiterDishesPage}
          />
        ) : !data?.orders?.length ? (
          <EmptyListBox params={params} isWaiter={isWaiter} />
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}
            >
              {!isWaiterDishesPage && (
                <ListTopBox
                  orders={data?.orders || []}
                  totalPrice={totalPrice}
                  allOrderPrice={allOrderPrice}
                  onChangeSelected={onChangeSelected}
                  onChangeTypeOfPay={onChangeTypeOfPay}
                  urlParams={params}
                  isWaiter={isWaiter}
                  paymentType={paymentType}
                />
              )}
              <OrdersList
                orders={data?.orders || []}
                onChangeSelected={onChangeSelected}
                selectedTotal={selectedTotal}
                selectedOrders={selectedOrders}
                urlParams={params}
                isSmall={isSmall}
                isWaiter={isWaiter}
                isWaiterDishesPage={isWaiterDishesPage}
                sortOrderBy={sortOrderBy}
              />
            </motion.div>
            {!isWaiterDishesPage && (
              <Checkout
                amount={selectedTotal}
                selectedOrders={selectedOrders}
                onChangeSelected={onChangeSelected}
                urlParams={params}
                isWaiter={isWaiter}
                isAllOrdersPaid={isAllOrdersPaid}
                paymentType={paymentType}
              />
            )}
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

Orders.propTypes = {
  isWaiter: PropTypes.bool,
};

export default Orders;
