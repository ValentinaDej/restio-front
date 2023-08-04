import { useGetOrdersByTableId } from 'api/service';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Checkout } from 'shared/Checkout/Checkout';
import { OrdersList } from 'shared/OrdersList/OrdersList';
import OrderListSkeleton from 'shared/Skeletons/OrderSkeleton/OrderSkeleton';
import PropTypes from 'prop-types';

const Orders = ({ isWaiter }) => {
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const params = useParams();
  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(price);
    setSelectedOrders(selectedOrders);
  };

  const { data: { data } = {}, isError, isLoading, isRefetching } = useGetOrdersByTableId(params);

  return (
    <>
      {isLoading ? (
        <OrderListSkeleton isWaiter={isWaiter} />
      ) : (
        <OrdersList
          orders={data?.data?.orders || []}
          onChangeSelected={onChangeSelected}
          selectedTotal={selectedTotal}
          selectedOrders={selectedOrders}
          isWaiter={isWaiter}
          urlParams={params}
        />
      )}
      <Checkout
        amount={selectedTotal}
        selectedOrders={selectedOrders}
        isWaiter={isWaiter}
        urlParams={params}
      />
    </>
  );
};

Orders.propTypes = {
  isWaiter: PropTypes.bool,
};

export default Orders;
