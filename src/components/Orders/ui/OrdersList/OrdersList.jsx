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
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useUpdateDishStatusByWaiter, useUpdateOrderStatusByWaiter } from 'api/order';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
  totalPrice,
  urlParams,
}) => {
  const dispatch = useDispatch();
  const [ordersIDs, setOrdersIDs] = useState([]);
  const { payment } = useSelector(getIsLoading);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(urlParams, ordersIDs);
  const { isLoadingDishStatus, mutate: mutateDishStatus } = useUpdateDishStatusByWaiter();
  const frontLink = location.href;

  useEffect(() => {
    const updateOrdersIds = orders
      .filter((order) => order.status !== 'Paid')
      .map((order) => order._id);

    setOrdersIDs(updateOrdersIds);
  }, [totalPrice, orders]);

  const selectOrder = useCallback(
    (id, totalPrice) => {
      const index = selectedOrders.indexOf(id);
      const fixedPrice = formatNumberWithTwoDecimals(totalPrice);
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

  const onClickChangeDishStatusAsWaiter = useCallback(
    (status, dishId, orderId) => {
      mutateDishStatus({ urlParams, status, dishId, orderId });
    },
    [mutateDishStatus, urlParams]
  );

  const sortedOrders = useCallback(() => {
    const sortedOrders = [...orders].sort((orderA, orderB) => {
      if (orderA.status === 'Paid' && orderB.status !== 'Paid') {
        return 1;
      }
      if (orderA.status !== 'Paid' && orderB.status === 'Paid') {
        return -1;
      }
      return new Date(orderB.created_at) - new Date(orderA.created_at);
    });

    const numberedOrders = sortedOrders.reverse().map((order, index) => ({
      ...order,
      orderNumber: index + 1,
    }));

    return numberedOrders.reverse();
  }, [orders]);

  const renderOrder = (order) => (
    <OrderCard
      key={order._id}
      {...order}
      onChange={selectOrder}
      small={!isWaiter}
      isWaiter={isWaiter}
      onChangeStatus={onClickChangeDishStatusAsWaiter}
      idx={order.orderNumber}
    />
  );

  return (
    <>
      <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
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
        <ul className={cls.list}>{sortedOrders().map(renderOrder)}</ul>
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
  orders: PropTypes.array,
  onChangeSelected: PropTypes.func,
  selectedTotal: PropTypes.number,
  selectedOrders: PropTypes.array,
  onTotalPrice: PropTypes.func,
  urlParams: PropTypes.object,
};
