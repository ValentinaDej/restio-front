import { useGetOrdersByTableId } from 'api/service';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkout } from 'components/Orders/ui/Checkout/Checkout';
import { OrdersList } from 'components/Orders/ui/OrdersList/OrdersList';
import OrderListSkeleton from 'shared/Skeletons/OrderSkeleton/OrderSkeleton';
import PropTypes from 'prop-types';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import cls from './Order.module.scss';
import Button from 'shared/Button/Button';
import { TbMoodSearch } from 'react-icons/tb';

const Orders = ({ isWaiter }) => {
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAllOrdersPaid, setIsAllOrdersPaid] = useState(false);
  const params = useParams();
  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(price);
    setSelectedOrders(selectedOrders);
  };

  const navigate = useNavigate();
  const onClickBackBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { data: { data } = {}, isError, isLoading, isRefetching } = useGetOrdersByTableId(params);

  useEffect(() => {
    if (data) {
      const allOrdersPaid = data?.data?.orders?.every((order) => {
        const allItemsServed = order?.orderItems?.every((item) => item.status === 'Served');
        return order.status === 'Paid' && allItemsServed;
      });
      setIsAllOrdersPaid(allOrdersPaid);
    }
  }, [data, data?.data?.orders]);

  return (
    <>
      {isLoading ? (
        <OrderListSkeleton isWaiter={isWaiter} isSmall={!isWaiter} />
      ) : !data?.data?.orders?.length ? (
        <div className={cls.box}>
          <TbMoodSearch size={150} className={cls.icon} />
          <Title mode={'h3'} fontSize={20} classname={cls.text}>
            {isWaiter ? 'There are no orders at this table yet' : 'No orders found...'}
          </Title>
          {!isWaiter && (
            <Text classname={cls.text}>Looks like you haven't made your order yet</Text>
          )}
          <Button size={'sm'} onClick={onClickBackBtn}>
            {isWaiter ? 'Back to tables' : 'Back to menu'}
          </Button>
        </div>
      ) : (
        <>
          <OrdersList
            orders={data?.data?.orders || []}
            onChangeSelected={onChangeSelected}
            selectedTotal={selectedTotal}
            selectedOrders={selectedOrders}
            urlParams={params}
            isWaiter={isWaiter}
          />

          <Checkout
            amount={selectedTotal}
            selectedOrders={selectedOrders}
            onChangeSelected={onChangeSelected}
            urlParams={params}
            isWaiter={isWaiter}
            isAllOrdersPaid={isAllOrdersPaid}
          />
        </>
      )}
    </>
  );
};

Orders.propTypes = {
  isWaiter: PropTypes.bool,
};

export default Orders;
