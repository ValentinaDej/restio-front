import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading } from 'store/customer/orders/selectors';
import { useCallback, useEffect, useState } from 'react';
import Button from 'shared/Button/Button';
import { payOrders } from 'store/customer/orders/asyncOperations';
import Text from 'shared/Text/Text';
import Loader from 'shared/Loader/Loader';
import { classNames } from 'helpers/classNames';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
}) => {
  const [ordersIDs] = useState(
    orders.filter((order) => order.status !== 'Paid').map((order) => order._id)
  );
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(
      orders.reduce((acc, order) => {
        if (order.status !== 'Paid') {
          const orderPrice = order.orderItems.reduce(
            (acc, item) => acc + item.dish.price * item.quantity,
            0
          );

          return acc + orderPrice;
        } else {
          return acc;
        }
      }, 0)
    );
  }, [orders, totalPrice]);

  const frontLink = location.href;

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const onClickPayAllAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        amount: totalPrice,
        order_id: ordersIDs[0],
        type: 'online',
        info: ordersIDs.join(','),
        frontLink,
      })
    );
  }, [dispatch, frontLink, ordersIDs, totalPrice]);

  const onClickMarkAsPaidAllAsWaiter = useCallback(() => {
    //need to update orders status
  }, []);

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
            mode={!totalPrice && 'disabled'}
          >
            {isWaiter ? 'Mark as paid all orders' : 'Pay online'}
          </Button>
        </div>
        <Text classname={cls.text}>
          {isWaiter
            ? 'Or select those orders that the customer has paid by selecting the ones you need.'
            : 'Or you can pay for each order separately by selecting the ones you need.'}
        </Text>
        <ul className={cls.list}>{orders.map(renderOrder)}</ul>
      </div>
      {isLoading.payment && (
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
