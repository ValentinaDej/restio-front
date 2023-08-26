import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import cls from './OrderList.module.scss';
import { OrderCard } from 'shared';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { errorMessage } from 'helpers/errorMessage';
import { useUpdateDishStatusByWaiter, useUpdateReadyDishesStatusesByWaiter } from 'api/order';

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
  const [loadingCardId, setLoadingCardId] = useState(null);
  const {
    isLoading: isLoadingChangeDishStatus,
    mutateAsync: mutateDishStatus,
    isError: isUpdateDishError,
    error: updateDishError,
  } = useUpdateDishStatusByWaiter();
  const {
    isLoading,
    mutateAsync: mutateReadyDishesStatus,
    isError: isUpdateReadyDishesError,
    error: updateReadyDishesError,
  } = useUpdateReadyDishesStatusesByWaiter();
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
      return sortedOrders.sort((orderA, orderB) => {
        if (orderA.status === sortOrderBy && orderB.status !== sortOrderBy) {
          return -1;
        }
        if (orderA.status !== sortOrderBy && orderB.status === sortOrderBy) {
          return 1;
        }
        return 0;
      });
    } else {
      return sortedOrders.reverse();
    }
  }, [orders, sortOrderBy]);

  const onClickChangeDishStatusAsWaiter = useCallback(
    async (dishId, orderId) => {
      const status = 'Served';
      try {
        setLoadingCardId(orderId);
        await mutateDishStatus({ urlParams, status, dishId, orderId });
        setLoadingCardId(null);
      } catch (err) {
        console.log(err.response?.data.message);
      }
    },
    [mutateDishStatus, urlParams]
  );

  const onClickMarkAllReadyDishesAsServedAsWaiter = useCallback(
    async (orderId) => {
      setLoadingCardId(orderId);
      await mutateReadyDishesStatus({ urlParams, orderId });
      setLoadingCardId(null);
    },
    [mutateReadyDishesStatus, urlParams]
  );

  useEffect(() => {
    if (isUpdateReadyDishesError) {
      errorMessage(updateReadyDishesError?.response.data.message);
    }
    if (isUpdateDishError) {
      errorMessage(updateDishError?.response.data.message);
    }
  }, [
    isUpdateDishError,
    isUpdateReadyDishesError,
    updateDishError?.response.data.message,
    updateReadyDishesError?.response.data.message,
  ]);

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
      isLoadingReadyDishesUpdate={loadingCardId === order._id && isLoading}
      isLoadingChangeDishStatus={loadingCardId === order._id && isLoadingChangeDishStatus}
    />
  );

  return (
    <AnimatePresence>
      <motion.ul exit={{ opacity: 0, y: 20 }} className={cls.list}>
        {sortedOrders().map(renderOrder)}
      </motion.ul>
    </AnimatePresence>
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
