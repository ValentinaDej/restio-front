import { useNavigate } from 'react-router-dom';

import css from './OrdersButton.module.scss';
import { useGetOrdersByTableId } from 'api/order';
import { ReactComponent as DishList } from 'assets/icons/dish-list.svg';

export const OrdersButton = ({ restId, tableId }) => {
  const navigate = useNavigate();
  const { data: orders } = useGetOrdersByTableId({ restId, tableId });
  const totalOrders = orders?.data?.orders.length;

  return (
    <>
      {totalOrders > 0 && (
        <button
          className={css.button}
          onClick={() => navigate(`/${restId}/tables/${tableId}/orders`)}
        >
          <span className={css.number}>{totalOrders}</span>
          <DishList className={css.icon} />
        </button>
      )}
    </>
  );
};
