import OrderCard from 'shared/OrderCard/OrderCard';
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

export const OrdersList = () => {
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
        order_id: '64c58973860d0119306ee2c3',
        type: 'online',
        // add ordersIDs
        info: ['64c58973860d0119306ee2c3', '64c58973860d0119306ee2c4'].join(','),
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
          <Button size={'sm'} mode={'outlined'}>
            Request bill
          </Button>
          <Button size={'sm'} onClick={onClickPayAllBtn}>
            Pay online
          </Button>
        </div>
        <Text classname={cls.text}>
          Or you can pay for each order separately by selecting the ones you need.
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
