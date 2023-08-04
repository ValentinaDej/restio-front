import Card from 'shared/Card/Card';
import css from './Cart.module.scss';
import Title from 'shared/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getProductFromState } from 'store/cart/cartSelectors';
import { BiDish } from 'react-icons/bi';
import { clearCart, decreaseQuantity, deleteProduct, increaseQuantity } from 'store/cart/cartSlice';
import Button from 'shared/Button/Button';
import Text from 'shared/Text/Text';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getProductFromState);

  const onClickHandler = () => {
    console.log(cart);
    //add function to send an order
    dispatch(clearCart());
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
      {cart?.length > 0 && (
        <div className={css['cart-container']} id="cart">
          <a href="#cart" className={css['cart-button']}>
            <BiDish className={css.icon} />
          </a>
          <Title mode="h3" color="#303c6c" fontSize={25}>
            Your order
          </Title>
          <ul className={css['cart-list']}>
            {cart.map(({ id, title, src, price, quantity }) => (
              <li className={css['cart-list__item']} key={id}>
                <Card
                  mode="cart"
                  id={id}
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
            <Title mode="h3" color="#303c6c" fontSize={20}>
              Total:
            </Title>
            <Text fontSize={20} color="#303c6c">
              ${total}
            </Text>
          </div>
          <Button onClick={onClickHandler}>Place an order</Button>
        </div>
      )}
    </>
  );
};

export default Cart;
