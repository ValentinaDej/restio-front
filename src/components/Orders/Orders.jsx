import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSSE } from 'react-hooks-sse';
import { Checkout } from 'components/Orders/ui/Checkout/Checkout';
import { OrdersList } from 'components/Orders/ui/OrdersList/OrdersList';
import OrderListSkeleton from 'shared/Skeletons/OrderSkeleton/OrderSkeleton';
import PropTypes from 'prop-types';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { useGetOrdersByTableId } from 'api/order';
import { NavigateButtons } from './ui/NavigateButtons/NavigateButtons';
import { EmptyListBox } from './ui/EmptyListBox/EmptyListBox';
import { ListTopBox } from './ui/ListTopBox/ListTopBox';
import { classNames } from 'helpers/classNames';

import cls from './Order.module.scss';

const Orders = ({ isWaiter, isSmall, isDishesPage }) => {
  const [paymentType, setPaymentType] = useState('');
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAllOrdersPaid, setIsAllOrdersPaid] = useState(false);
  const params = useParams();
  const { tableId } = params;

  const onChangeSelected = (price, selectedOrders) => {
    setSelectedTotal(formatNumberWithTwoDecimals(price));
    setSelectedOrders(selectedOrders);
  };
  const updateDishStatusEvent = useSSE('dish status');

  const { data: { data } = {}, isError, isLoading, refetch } = useGetOrdersByTableId(params);

  useEffect(() => {
    if (updateDishStatusEvent && updateDishStatusEvent.message) {
      const table_id = updateDishStatusEvent.message.replace(/"/g, '');
      if (table_id === tableId) {
        refetch({ force: true });
      }
    }
  }, [updateDishStatusEvent, refetch, tableId]);

  const onChangeTypeOfPay = useCallback((e) => {
    const value = e.target.ariaLabel;
    const checked = e.target.checked;
    if (value === 'cash') {
      setPaymentType('cash');
    }
    if (value === 'POS') {
      setPaymentType('POS');
    }
    if (!checked) {
      setPaymentType('');
    }
  }, []);

  useEffect(() => {
    if (data) {
      const allOrdersPaid = data?.orders?.every((order) => {
        const allItemsServed = order?.orderItems?.every((item) => item.status === 'Served');
        return order.status === 'Paid' && allItemsServed;
      });
      const newTotalPrice = data?.orders?.reduce((acc, order) => {
        if (order.status !== 'Paid') {
          const orderPrice = order.orderItems.reduce(
            (acc, item) => acc + item.dish.price * item.quantity,
            0
          );

          return acc + orderPrice;
        } else {
          return acc;
        }
      }, 0);
      setTotalPrice(formatNumberWithTwoDecimals(newTotalPrice));
      setIsAllOrdersPaid(allOrdersPaid);
    }
  }, [data, data?.orders]);

  return (
    <>
      <NavigateButtons params={params} isWaiter={isWaiter} />
      {isLoading ? (
        <OrderListSkeleton isWaiter={isWaiter} isSmall={isSmall} />
      ) : !data?.orders?.length ? (
        <EmptyListBox params={params} isWaiter={isWaiter} />
      ) : (
        <>
          <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
            {!isDishesPage && (
              <ListTopBox
                orders={data?.orders || []}
                totalPrice={totalPrice}
                onChangeSelected={onChangeSelected}
                onChangeTypeOfPay={onChangeTypeOfPay}
                urlParams={params}
                isWaiter={isWaiter}
                paymentType={paymentType}
              />
            )}

            <OrdersList
              orders={data?.orders || []}
              onChangeSelected={onChangeSelected}
              selectedTotal={selectedTotal}
              selectedOrders={selectedOrders}
              urlParams={params}
              isSmall={isSmall}
              isWaiter={isWaiter}
              isDishesPage={isDishesPage}
            />
          </div>
          {!isDishesPage && (
            <Checkout
              amount={selectedTotal}
              selectedOrders={selectedOrders}
              onChangeSelected={onChangeSelected}
              urlParams={params}
              isWaiter={isWaiter}
              isAllOrdersPaid={isAllOrdersPaid}
              paymentType={paymentType}
            />
          )}
        </>
      )}
    </>
  );
};

Orders.propTypes = {
  isWaiter: PropTypes.bool,
};

export default Orders;
