import Card from 'shared/Card/Card';
import css from './Cart.module.scss';
import Title from 'shared/Title/Title';
import { useSelector } from 'react-redux';
import { getProductFromState } from 'store/cart/cartSelectors';

const Cart = () => {
  const cart = useSelector(getProductFromState);

  return (
    <>
      {cart?.length > 0 && (
        <div className={css['cart-container']}>
          <Title mode="h3" color="#303c6c" fontSize={25}>
            Cart
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
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cart;
