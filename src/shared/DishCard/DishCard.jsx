import PropTypes from 'prop-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';

import css from './DishCard.module.scss';
import { addProduct } from 'store/cart/cartSlice';

export const DishCard = memo(({ id, src, title, ingredients, weight, price, link }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(addProduct({ src, title, price, id }));
  };

  return (
    <div className={css['card-container']}>
      <div className={css['card-container__image-wrapper']}>
        <img className={css['card-container__image']} src={src} alt={title} />
      </div>
      <div className={css['card-container__wrapper']}>
        <h2 className={css['card-container__title']}>{title}</h2>
        <p className={css['card-container__weight']}>{weight}g</p>
      </div>
      <p className={css['card-container__ingredients']}>
        {ingredients?.map((ingredient) => ingredient.name).join(', ')}
      </p>
      <div className={css['card-container__wrapper']}>
        <p className={css['card-container__price']}>${price?.toFixed(2)}</p>
        <button type="button" onClick={onClickHandler}>
          <MdOutlineAddCircle className={css['card-container__icon']} />
        </button>
      </div>
      <Link className={css['card-container__link']} to={link}>
        Show details...
      </Link>
    </div>
  );
});

DishCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  ingredients: PropTypes.array,
  weight: PropTypes.number,
  price: PropTypes.number,
  link: PropTypes.string,
  onClick: PropTypes.func,
};
