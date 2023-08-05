import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { BiSolidTrash } from 'react-icons/bi';
import { MdOutlineAddCircle } from 'react-icons/md';

import css from './Card.module.scss';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import { IconButton } from 'shared/IconButton/IconButton';
import { memo } from 'react';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';

const variant = {
  order: 'order',
  cart: 'cart',
  waiter: 'waiter',
  cook: 'cook',
};

const Card = memo(
  ({ src, title, price, quantity, mode = variant.order, addOne, minusOne, onDelete, onClick }) => {
    const sum = formatNumberWithTwoDecimals(price * quantity);
    return (
      <div className={css['card']}>
        <div className={css['card__image-container']}>
          <img className={css['card__image']} src={src} alt={title} />
        </div>
        <div className={css['card__wrapper']}>
          <div className={css['card__flex-container']}>
            <h3 className={css['card__title']}>{title}</h3>

            {mode === variant.cart && (
              <div className={css['card__icon-wrapper']}>
                <IconButton Svg={BiSolidTrash} size={16} onClick={onDelete} />
              </div>
            )}
          </div>

          <div className={css['card__flex-container']}>
            {mode === variant.cart && (
              <QuantityButton size="sm" quantity={quantity} addOne={addOne} minusOne={minusOne} />
            )}
            {mode === variant.waiter && (
              <QuantityButton size="sm" quantity={quantity} addOne={addOne} minusOne={minusOne} />
            )}
            {mode === variant.cook && (
              <>
                <IoIosClose className={css['card__icon']} />
                <p className={css['card__quantity']}>{quantity}</p>
              </>
            )}
            {mode === variant.order && (
              <>
                <IoIosClose className={css['card__icon']} />
                <p className={css['card__quantity']}>{quantity}</p>
              </>
            )}

            {mode === variant.cart && <p className={css['card__sum']}>${sum}</p>}

            {mode === variant.order && <p className={css['card__sum']}>${sum}</p>}
          </div>
        </div>
        {mode === variant.waiter && (
          <button className={css['card__add-button']} type="button" onClick={onClick}>
            <MdOutlineAddCircle className={`${css['card__add-icon']} ${css['card__icon']}`} />
          </button>
        )}
      </div>
    );
  }
);

Card.propTypes = {
  mode: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  addOne: PropTypes.func,
  minusOne: PropTypes.func,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
};

export default Card;
