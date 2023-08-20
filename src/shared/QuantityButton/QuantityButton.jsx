import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import css from './QuantityButton.module.scss';

export const QuantityButton = ({ quantity = 1, addOne, minusOne, mode, size, classname }) => {
  return (
    <div
      className={`${css['quantity-container']} ${css[`quantity-container_${mode}`]}
        ${classname} 
        ${css[`quantity-container_${size}`]}`}
    >
      <button
        className={css['quantity-container__button']}
        type="button"
        onClick={minusOne}
        disabled={quantity <= 1}
      >
        <AiOutlineMinus className={css['quantity-container__icon']} />
      </button>
      <p className={css['quantity-container__value']}>{quantity}</p>
      <button
        className={css['quantity-container__button']}
        type="button"
        onClick={addOne}
        disabled={quantity >= 99}
      >
        <AiOutlinePlus className={css['quantity-container__icon']} />
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  quantity: PropTypes.number,
  addOne: PropTypes.func,
  minusOne: PropTypes.func,
  mode: PropTypes.string,
  size: PropTypes.string,
};
