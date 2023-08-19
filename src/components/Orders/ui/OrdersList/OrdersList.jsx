import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useUpdateDishStatusByWaiter, useUpdateReadyDishesStatusesByWaiter } from 'api/order';
import { AnimatePresence, motion } from 'framer-motion';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
  urlParams,
  isSmall,
  isWaiterDishesPage,
  sortOrderBy,
}) => {
  const { mutateAsync: mutateDishStatus } = useUpdateDishStatusByWaiter();
  const { mutate: mutateReadyDishesStatus } = useUpdateReadyDishesStatusesByWaiter();
  const { pathname } = useLocation();

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
    let sortedOrders = [...orders];

    if (sortOrderBy !== 'None') {
      return [...sortedOrders].sort((orderA, orderB) => {
        if (orderA.status === sortOrderBy && orderB.status !== sortOrderBy) {
          return -1;
        }
        if (orderA.status !== sortOrderBy && orderB.status === sortOrderBy) {
          return 1;
        }
        return 0;
      });
    } else {
      return [...sortedOrders].reverse();
    }
  }, [orders, sortOrderBy]);

  const onClickChangeDishStatusAsWaiter = useCallback(
    async (status, dishId, orderId) => {
      try {
        await mutateDishStatus({ urlParams, status, dishId, orderId });
        return 'success';
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
    [mutateDishStatus, urlParams]
  );

  const onClickMarkAllReadyDishesAsServedAsWaiter = useCallback(
    async (orderId) => {
      mutateReadyDishesStatus({ urlParams, orderId });
    },
    [mutateReadyDishesStatus, urlParams]
  );

  const renderOrder = (order) => (
    <OrderCard
      key={order._id}
      {...order}
      onChange={selectOrder}
      small={isSmall}
      isWaiter={isWaiter}
      isPayCard={pathname.includes('pay')}
      onChangeStatus={onClickChangeDishStatusAsWaiter}
      onChangeAllReadyDishes={onClickMarkAllReadyDishesAsServedAsWaiter}
      isWaiterDishesPage={isWaiterDishesPage}
    />
  );

  return (
    <>
      <AnimatePresence>
        <motion.ul exit={{ opacity: 0, y: 20 }} className={cls.list}>
          {sortedOrders().map(renderOrder)}
        </motion.ul>
      </AnimatePresence>
    </>
  );
};

OrdersList.propTypes = {
  isWaiter: PropTypes.bool,
  isWaiterDishesPage: PropTypes.bool,
  orders: PropTypes.array,
  onChangeSelected: PropTypes.func,
  selectedTotal: PropTypes.number,
  selectedOrders: PropTypes.array,
  urlParams: PropTypes.object,
  sortOrderBy: PropTypes.string,
};
