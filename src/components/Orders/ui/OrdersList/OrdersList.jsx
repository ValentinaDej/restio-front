import OrderCard from 'shared/OrderCard/OrderCard';
import PropTypes from 'prop-types';
import cls from './OrderList.module.scss';
import { useSelector } from 'react-redux';
import { getIsLoading } from 'store/customer/orders/selectors';
import { useCallback, useState } from 'react';
import Loader from 'shared/Loader/Loader';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useUpdateDishStatusByWaiter } from 'api/order';
import Text from 'shared/Text/Text';
import { DropDown } from 'shared/DropDown/DropDown';

export const OrdersList = ({
  isWaiter,
  orders,
  onChangeSelected,
  selectedTotal,
  selectedOrders,
  urlParams,
}) => {
  const [sortOrderBy, setSortOrderBy] = useState('None');
  const { payment } = useSelector(getIsLoading);
  const {
    data,
    isLoadingDishStatus,
    mutateAsync: mutateDishStatus,
  } = useUpdateDishStatusByWaiter();

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

  const renderOrder = (order) => (
    <OrderCard
      key={order._id}
      {...order}
      onChange={selectOrder}
      small={!isWaiter}
      isWaiter={isWaiter}
      onChangeStatus={onClickChangeDishStatusAsWaiter}
    />
  );

  return (
    <>
      <div className={cls.sort}>
        <Text>Sort by</Text>
        <DropDown
          options={[
            { value: 'None', label: 'No Sorting' },
            { value: 'Open', label: 'Open' },
            { value: 'Paid', label: 'Paid' },
          ]}
          defaultValue="No Sorting"
          onSelect={(e) => setSortOrderBy(e.value)}
        />
      </div>
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
