import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading } from 'store/customer/orders/selectors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from 'shared/Button/Button';
import { payOrders } from 'store/customer/orders/asyncOperations';
import Text from 'shared/Text/Text';
import Loader from 'shared/Loader/Loader';
import { classNames } from 'helpers/classNames';
import { useUpdateOrderStatusByWaiterOrCook } from 'api/service';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
  onTotalPrice,
  urlParams,
}) => {
  const [ordersIDs, setOrdersIDs] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const dispatch = useDispatch();
  const { payment } = useSelector(getIsLoading);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiterOrCook(urlParams, ordersIDs);
  const frontLink = location.href;

  const sortedOrders = useMemo(() => {
    return [...orders].sort((orderA, orderB) => {
      if (orderA.status === 'Paid' && orderB.status !== 'Paid') {
        return 1;
      }
      if (orderA.status !== 'Paid' && orderB.status === 'Paid') {
        return -1;
      }
      return new Date(orderB.created_at) - new Date(orderA.created_at);
    });
  }, [orders]);

  useEffect(() => {
    const newTotalPrice = orders.reduce((acc, order) => {
      if (order.status !== 'Paid') {
        const orderPrice = order.orderItems.reduce(
          (acc, item) => acc + item.dish.price * item.quantity,
          0
        );

        return acc + orderPrice;
      } else {
        return acc;
      }
    }, 0);
    const updateOrdersIds = orders
      .filter((order) => order.status !== 'Paid')
      .map((order) => order._id);

    setOrdersIDs(updateOrdersIds);
    setTotalPrice(Math.round(newTotalPrice * 100) / 100);
  }, [onTotalPrice, orders]);

  const onClickPayAllAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        amount: totalPrice,
        type: 'online',
        info: ordersIDs.join(','),
        frontLink,
      })
    );
  }, [dispatch, frontLink, ordersIDs, totalPrice]);

  const onClickMarkAsPaidAllAsWaiter = useCallback(() => {
    mutate();
  }, [mutate]);

  const selectOrder = useCallback(
    (id, totalPrice) => {
      const index = selectedOrders.indexOf(id);
      const fixedPrice = Math.round(totalPrice * 100) / 100;
      let updatedSelectedOrders;
      let updatedTotal;

      if (index !== -1) {
        updatedSelectedOrders = selectedOrders.filter((orderId) => orderId !== id);
        updatedTotal = selectedTotal - fixedPrice;
      } else {
        updatedSelectedOrders = [...selectedOrders, id];
        updatedTotal = selectedTotal + fixedPrice;
      }

      onChangeSelected(updatedTotal, updatedSelectedOrders);
    },
    [onChangeSelected, selectedOrders, selectedTotal]
  );

  const renderOrder = (order) => (
    <OrderCard
      key={order._id}
      {...order}
      onChange={selectOrder}
      small={!isWaiter}
      isWaiter={isWaiter}
    />
  );

  return (
    <>
      <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
        <Text fontWeight={700} fontSize={20} classname={cls.text}>
          {!totalPrice
            ? isWaiter
              ? 'All orders paid, mark table as free when customers leave.'
              : 'All orders are paid, thank you for visiting our restaurant.'
            : `Total price $${totalPrice}`}
        </Text>
        <div className={cls.btnsBox}>
          <Button
            size={'sm'}
            onClick={isWaiter ? onClickMarkAsPaidAllAsWaiter : onClickPayAllAsCustomer}
            mode={(!totalPrice || isLoading) && 'disabled'}
            className={cls.btn}
          >
            {isWaiter ? (
              isLoading ? (
                <Loader size={'xs'} />
              ) : (
                'Mark as paid all orders'
              )
            ) : (
              'Pay online'
            )}
          </Button>
        </div>
        <Text classname={cls.text}>
          {isWaiter
            ? 'Or select those orders that the customer has paid by selecting the ones you need.'
            : 'Or you can pay for each order separately by selecting the ones you need.'}
        </Text>
        <ul className={cls.list}>{sortedOrders.map(renderOrder)}</ul>
      </div>
      {payment && (
        <div className={cls.layout}>
          <Loader />
        </div>
      )}
    </>
  );
};

OrdersList.propTypes = {
  isWaiter: PropTypes.bool,
};
