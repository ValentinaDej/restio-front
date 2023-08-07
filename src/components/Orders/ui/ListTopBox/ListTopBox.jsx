import { useUpdateOrderStatusByWaiter } from 'api/order';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'shared/Button/Button';
import Loader from 'shared/Loader/Loader';
import Text from 'shared/Text/Text';
import { payOrders } from 'store/customer/orders/asyncOperations';
import cls from './ListTopBox.module.scss';

export const ListTopBox = ({ orders, totalPrice, onChangeSelected, urlParams, isWaiter }) => {
  const dispatch = useDispatch();
  const [ordersIDs, setOrdersIDs] = useState([]);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(urlParams, ordersIDs);
  const frontLink = location.href;

  useEffect(() => {
    const updateOrdersIds = orders
      .filter((order) => order.status !== 'Paid')
      .map((order) => order._id);

    setOrdersIDs(updateOrdersIds);
  }, [orders]);

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
    onChangeSelected(0, []);
  }, [mutate, onChangeSelected]);

  return (
    <>
      <div>
        <Text fontWeight={700} fontSize={20} classname={cls.text}>
          {totalPrice === 0
            ? isWaiter
              ? 'All orders paid, mark table as free when customer leave.'
              : 'All orders are paid, thank you for visiting our restaurant.'
            : `Total price $${totalPrice}`}
        </Text>
      </div>
      <div className={cls.btnsBox}>
        <Button
          size={'sm'}
          onClick={isWaiter ? onClickMarkAsPaidAllAsWaiter : onClickPayAllAsCustomer}
          mode={(!totalPrice || isLoading) && 'disabled'}
          className={cls.btn}
        >
          {isWaiter ? isLoading ? <Loader size={'xs'} /> : 'Mark as paid all orders' : 'Pay online'}
        </Button>
      </div>
      <Text classname={cls.text}>
        {isWaiter
          ? 'Or select those orders that the customer has paid by selecting the ones you need.'
          : 'Or you can pay for each order separately by selecting the ones you need.'}
      </Text>
    </>
  );
};
