import { useDispatch, useSelector } from 'react-redux';

import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import Text from 'shared/Text/Text';
import css from './Cart.module.scss';
import { getProductFromState } from 'store/cart/cartSelectors';
import { clearCart, decreaseQuantity, deleteProduct, increaseQuantity } from 'store/cart/cartSlice';
import { createOrder } from 'api/order';
import { useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import Loader from 'shared/Loader/Loader';

const Cart = () => {
  const { restId, tableId } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(getProductFromState);
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    try {
      setIsLoading(true);
      const order = cart.map(({ id, quantity, comment }) => ({ dish: id, quantity, comment }));
      const data = {
        orderItems: order,
        table_id: tableId,
      };
      await createOrder(data, restId);
      dispatch(clearCart());
    } catch (error) {
      return toast.error('Something went wrong... Please call the waiter');
    } finally {
      setIsLoading(false);
    }
  };
  const addOneItemHandler = (id) => {
    dispatch(increaseQuantity(id));
  };
  const minusOneItemHandler = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const deleteDishHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const total = cart.reduce((acc, item) => (acc += item.price * item.quantity), 0).toFixed(2);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cart?.length > 0 && (
            <div className={css['cart-container']} id="cart">
              <a href="#cart" className={css['cart-button']}>
                Move to order
              </a>
              <Title mode="h3" color={'var(--color-blue-dark)'} fontSize={25}>
                Your order
              </Title>
              <ul className={css['cart-list']}>
                {cart.map(({ id, title, src, price, quantity }) => (
                  <li className={css['cart-list__item']} key={id}>
                    <Card
                      mode="cart"
                      dishId={id}
                      title={title}
                      src={src}
                      price={price}
                      quantity={quantity}
                      addOne={() => addOneItemHandler(id)}
                      minusOne={() => minusOneItemHandler(id)}
                      onDelete={() => deleteDishHandler(id)}
                    />
                  </li>
                ))}
              </ul>
              <div className={css['total-wrapper']}>
                <Title mode="h3" color={'var(--color-blue-dark)'} fontSize={20}>
                  Total:
                </Title>
                <Text fontSize={20} color={'var(--color-blue-dark)'}>
                  ${total}
                </Text>
              </div>
              <Button onClick={onClickHandler}>Place an order</Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
