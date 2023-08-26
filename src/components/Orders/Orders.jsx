import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSSE } from 'react-hooks-sse';
import { motion, AnimatePresence } from 'framer-motion';

import cls from './Order.module.scss';
import { OrderSkeleton, Title, Loader } from 'shared';
import { NavigateButtons } from './ui/NavigateButtons/NavigateButtons';
import { EmptyListBox } from './ui/EmptyListBox/EmptyListBox';
import { ListTopBox } from './ui/ListTopBox/ListTopBox';
import { ListBottomBox } from 'components/Orders/ui/ListBottomBox/ListBottomBox';
import { OrdersList } from 'components/Orders/ui/OrdersList/OrdersList';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { classNames } from 'helpers/classNames';
import { errorMessage } from 'helpers/errorMessage';
import { useGetOrdersByTableId } from 'api/order';
import { getIsLoading } from 'store/customer/orders/selectors';

export const Orders = ({ isWaiter, isSmall, isWaiterDishesPage }) => {
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
  const { payment } = useSelector(getIsLoading);
  const params = useParams();
  const { tableId } = params;

  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(formatNumberWithTwoDecimals(price));
    setSelectedOrders(selectedOrders);
  };
  const updateDishStatusEvent = useSSE('dish status');
  const updateOrderStatusEvent = useSSE('update order status');
  const newOrderEvent = useSSE('new order');

  const { data: { data } = {}, isLoading, refetch, isError, error } = useGetOrdersByTableId(params);

  useEffect(() => {
    if (updateDishStatusEvent && updateDishStatusEvent.message) {
      const table_id = updateDishStatusEvent.message.replace(/"/g, '');
      if (table_id === tableId) {
        refetch({ force: true });
      }
    }
  }, [updateDishStatusEvent, refetch, tableId]);

  useEffect(() => {
    if (newOrderEvent && newOrderEvent.message) {
      const table_id = newOrderEvent.message.replace(/"/g, '');
      if (table_id === tableId) {
        refetch({ force: true });
      }
    }
  }, [newOrderEvent, refetch, tableId]);

  useEffect(() => {
    if (updateOrderStatusEvent && updateOrderStatusEvent.message) {
      const table_id = updateOrderStatusEvent.message.replace(/"/g, '');
      if (table_id === tableId) {
        refetch({ force: true });
      }
    }
  }, [refetch, tableId, updateOrderStatusEvent]);

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

      data?.orders?.forEach((order) => {
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
      setAllOrderPrice(formatNumberWithTwoDecimals(allOrderPrice));
      setNotPaidOrders(notPaidOrders);
      setTotalPrice(formatNumberWithTwoDecimals(newTotalPrice));
      setIsAllOrdersPaid(isAllOrdersPaid);
      setIsMounted(false);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      errorMessage(error?.response?.data.message);
      setIsMounted(false);
    }
  }, [error?.response?.data?.message, isError]);

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
      <div className={cls.section}>
        <NavigateButtons
          params={params}
          isWaiter={isWaiter}
          notServedDishes={notServedDishes}
          notPaidOrders={notPaidOrders}
          setSortOrderBy={setSortOrderBy}
        />
        {isLoading || isMounted ? (
          <OrderSkeleton
            isWaiter={isWaiter}
            isSmall={isSmall}
            isWaiterDishesPage={isWaiterDishesPage}
          />
        ) : !data?.orders?.length ? (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <EmptyListBox params={params} isWaiter={isWaiter} key={'emptyBox'} />
            </motion.div>
          </AnimatePresence>
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
                  amount={selectedTotal}
                  isAllOrdersPaid={isAllOrdersPaid}
                  onChangeSelected={onChangeSelected}
                  selectedOrders={selectedOrders}
                  onChangeTypeOfPay={onChangeTypeOfPay}
                  urlParams={params}
                  isWaiter={isWaiter}
                  paymentType={paymentType}
                  key={'topList'}
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
                key={'list'}
              />
            </motion.div>
            {!isWaiter && (
              <ListBottomBox
                totalPrice={totalPrice}
                amount={selectedTotal}
                selectedOrders={selectedOrders}
                urlParams={params}
                key={'listBottomBox'}
              />
            )}
            {payment && (
              <div className={cls.layout} key={'loader'}>
                <Loader />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

Orders.propTypes = {
  isWaiter: PropTypes.bool,
  isSmall: PropTypes.bool,
  isWaiterDishesPage: PropTypes.bool,
};
