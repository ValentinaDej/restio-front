import { useGetOrdersByTableId } from 'api/service';
import { useState } from 'react';
import { Checkout } from 'shared/Checkout/Checkout';
import { OrdersList } from 'shared/OrdersList/OrdersList';
import OrderListSkeleton from 'shared/Skeletons/OrderSkeleton/OrderSkeleton';

export const WaiterOrders = () => {
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(price);
    setSelectedOrders(selectedOrders);
  };

  const { data: { data } = {}, isError, isLoading, isRefetching } = useGetOrdersByTableId();

  return (
    <>
      {isLoading ? (
        <OrderListSkeleton isWaiter />
      ) : (
        <OrdersList
          orders={data?.data?.orders || []}
          onChangeSelected={onChangeSelected}
          selectedTotal={selectedTotal}
          selectedOrders={selectedOrders}
          isWaiter
        />
      )}
      <Checkout amount={selectedTotal} selectedOrders={selectedOrders} isWaiter />
    </>
  );
};
