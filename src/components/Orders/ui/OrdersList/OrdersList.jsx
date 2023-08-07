import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useSelector } from 'react-redux';
import { getIsLoading } from 'store/customer/orders/selectors';
import { useCallback } from 'react';
import Loader from 'shared/Loader/Loader';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useUpdateDishStatusByWaiter } from 'api/order';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
  urlParams,
}) => {
  const { payment } = useSelector(getIsLoading);
  const { isLoadingDishStatus, mutate: mutateDishStatus } = useUpdateDishStatusByWaiter();

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

  const onClickChangeDishStatusAsWaiter = useCallback(
    (status, dishId, orderId) => {
      mutateDishStatus({ urlParams, status, dishId, orderId });
    },
    [mutateDishStatus, urlParams]
  );

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
      <ul className={cls.list}>{sortedOrders().map(renderOrder)}</ul>
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
  urlParams: PropTypes.object,
};
