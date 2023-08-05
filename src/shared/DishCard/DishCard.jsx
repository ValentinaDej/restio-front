import PropTypes from 'prop-types';
import { MdOutlineAddCircle } from 'react-icons/md';

import css from './DishCard.module.scss';
import { memo } from 'react';

const DishCard = memo(({ src, title, ingredients, weight, price, onClick }) => {
  return (
    <div className={css['card-container']}>
      <div className={css['card-container__image-wrapper']}>
        <img className={css['card-container__image']} src={src} alt={title} />
      </div>
      <div className={css['card-container__wrapper']}>
        <h3 className={css['card-container__title']}>{title}</h3>
        <p className={css['card-container__weight']}>{weight}g</p>
      </div>
      <p className={css['card-container__ingredients']}>{ingredients?.join(', ')}</p>
      <div className={css['card-container__wrapper']}>
        <p className={css['card-container__price']}>${price?.toFixed(2)}</p>
        <button type="button" onClick={onClick}>
          <MdOutlineAddCircle className={css['card-container__icon']} />
        </button>
      </div>
    </div>
  );
});

DishCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  ingredients: PropTypes.array,
  weight: PropTypes.number,
  price: PropTypes.number,
  onClick: PropTypes.func,
};

export default DishCard;
