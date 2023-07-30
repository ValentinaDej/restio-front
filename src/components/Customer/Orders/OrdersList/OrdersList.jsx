import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersIDs, getSelectedOrders, getTotalPrice } from 'store/customer/orders/selectors';
import { customerOrdersActions } from 'store/customer/orders/ordersSlice';
import { useCallback } from 'react';
import Button from 'shared/Button/Button';
import { payOrders } from 'store/customer/orders/asyncOperations';
import Text from 'shared/Text/Text';

export const OrdersList = ({ orders }) => {
  const selectedOrders = useSelector(getSelectedOrders);
  const ordersIDs = useSelector(getOrdersIDs);
  const totalPrice = useSelector(getTotalPrice);

  const dispatch = useDispatch();

  const onClickPayAllBtn = useCallback(() => {
    dispatch(
      payOrders({
        amount: totalPrice,
        // ordersIDs[0]
        order_id: '64c58973860d0119306ee2e8',
        type: 'online',
        // add ordersIDs
        info: ['64c58973860d0119306ee2e8', '64c58973860d0119306ee2e9'].join(','),
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
    <div className={cls.box}>
      <Text fontWeight={700} fontSize={20}>
        Total price ${totalPrice}
      </Text>
      <div className={cls.btnsBox}>
        <Button size={'sm'}>Request bill</Button>
        <Button size={'sm'} onClick={onClickPayAllBtn}>
          Pay online
        </Button>
      </div>
      <Text>Or you can pay for each order separately by selecting the ones you need.</Text>
      <ul className={cls.list}>{orders.map(renderOrder)}</ul>
    </div>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.array,
};
