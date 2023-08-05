import PropTypes from 'prop-types';
import { memo } from 'react';
import { IoIosClose } from 'react-icons/io';
import { BiSolidTrash } from 'react-icons/bi';

import css from './Card.module.scss';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import { IconButton } from 'shared/IconButton/IconButton';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import Status from 'shared/Status/Status';
import StatusSelector from 'shared/StatusSelector/StatusSelector';

const variant = {
  order: 'order',
  cart: 'cart',
  waiter: 'waiter',
  cook: 'cook',
};

const Card = memo(
  ({
    src,
    title,
    price,
    quantity = 1,
    mode = variant.order,
    addOne,
    minusOne,
    onDelete,
    currentSelectStatus = 'Ordered',
    statusCurrent,
    changeStatusFunction,
  }) => {
    const sum = formatNumberWithTwoDecimals(price * quantity);
    return (
      <div className={css['card']}>
        <div className={css['card__image-container']}>
          <img className={css['card__image']} src={src} alt={title} />
        </div>
        <div className={css['card__wrapper']}>
          <div className={css['card__flex-container']}>
            <h3 className={css['card__title']}>{title}</h3>
            {mode === variant.order && (
              <div className={css['card__icon-wrapper']}>
                <Status statusCurrent={statusCurrent} />
              </div>
            )}
            {mode === variant.waiter && (
              <div className={css['card__icon-wrapper']}>
                <StatusSelector
                  mode="dishes"
                  currentStatus={currentSelectStatus}
                  changeStatusFunction={changeStatusFunction}
                />
              </div>
            )}
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
              <>
                <IoIosClose className={css['card__icon']} />
                <p className={css['card__quantity']}>{quantity}</p>
              </>
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
  statusCurrent: PropTypes.string,
  currentSelectStatus: PropTypes.string,
  changeStatusFunction: PropTypes.func,
};

export default Card;
