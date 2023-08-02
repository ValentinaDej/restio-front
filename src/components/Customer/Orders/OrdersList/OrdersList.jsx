import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getOrders,
  getOrdersIDs,
  getSelectedOrders,
  getTotalPrice,
} from 'store/customer/orders/selectors';
import { customerOrdersActions } from 'store/customer/orders/ordersSlice';
import { useCallback } from 'react';
import Button from 'shared/Button/Button';
import { payOrders } from 'store/customer/orders/asyncOperations';
import Text from 'shared/Text/Text';
import Loader from 'shared/Loader/Loader';

export const OrdersList = ({ isWaiter, small }) => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const selectedOrders = useSelector(getSelectedOrders);
  const ordersIDs = useSelector(getOrdersIDs);
  const totalPrice = useSelector(getTotalPrice);
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
    (id) => {
      dispatch(customerOrdersActions.selectOrders(id));
    },
    [dispatch]
  );

  const renderOrder = (order) => (
    <OrderCard
      key={order._id}
      {...order}
      isChecked={selectedOrders?.includes(order._id)}
      onChangePayAction={selectPayOrder}
    />
  );

  return (
    <>
      <div className={cls.box}>
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
  small: PropTypes.bool,
};
