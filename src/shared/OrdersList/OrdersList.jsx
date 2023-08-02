import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading } from 'store/customer/orders/selectors';
import { useCallback, useState } from 'react';
import Button from 'shared/Button/Button';
import { payOrders } from 'store/customer/orders/asyncOperations';
import Text from 'shared/Text/Text';
import Loader from 'shared/Loader/Loader';
import { classNames } from 'helpers/classNames';

export const OrdersList = ({ isWaiter, list, onChangeSelected, selectedTotal, selectedOrders }) => {
  const [orders] = useState(list);
  const [ordersIDs] = useState(orders.map((order) => order._id));
  const [totalPrice] = useState(
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
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const onClickPayAllBtn = useCallback(() => {
    dispatch(
      payOrders({
        amount: totalPrice,
        // ordersIDs[0]
        order_id: '64c58973860d0119306ee2c7',
        type: 'online',
        // add ordersIDs
        info: ['64c58973860d0119306ee2c7', '64c58973860d0119306ee2c8'].join(','),
      })
    );
  }, [dispatch, totalPrice]);

  const selectPayOrder = useCallback(
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
      onChange={selectPayOrder}
      small={!isWaiter}
      isWaiter={isWaiter}
    />
  );

  return (
    <>
      <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
        <Text fontWeight={700} fontSize={20} classname={cls.text}>
          Total price ${totalPrice}
        </Text>
        <div className={cls.btnsBox}>
          <Button size={'sm'} onClick={onClickPayAllBtn}>
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
