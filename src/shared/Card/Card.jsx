import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import { BiSolidTrash, BiSolidCommentAdd, BiSolidCommentCheck } from 'react-icons/bi';

import css from './Card.module.scss';
import { QuantityButton, IconButton, Status, StatusSelector } from 'shared';
import { Dialog } from 'components';
import { getProductFromState } from 'store/cart/cartSelectors';

const variant = {
  order: 'order',
  cart: 'cart',
  waiter: 'waiter',
  cook: 'cook',
};

export const Card = memo(
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
    dishId,
  }) => {
    const cart = useSelector(getProductFromState);
    const exist = cart.some(({ id, comment }) => id === dishId && comment);

    const sum = (price * quantity).toFixed(2);
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        {isOpen && <Dialog id={dishId} setIsOpen={setIsOpen} />}
        <div className={css['card']}>
          <div className={css['card__image-container']}>
            <img className={css['card__image']} src={src} alt={title} />
          </div>
          <div className={css['card__wrapper']}>
            <div className={css['card__flex-container']}>
              <h3 className={css['card__title']}>{title}</h3>
              {mode === variant.cart && (
                <>
                  {exist ? (
                    <BiSolidCommentCheck
                      className={css['card__comment']}
                      onClick={() => setIsOpen(true)}
                    />
                  ) : (
                    <BiSolidCommentAdd
                      className={css['card__comment']}
                      onClick={() => setIsOpen(true)}
                    />
                  )}
                </>
              )}
              {mode === variant.waiter && (
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
            </div>

            <div className={css['card__flex-container']}>
              {mode === variant.cart && (
                <QuantityButton size="sm" quantity={quantity} addOne={addOne} minusOne={minusOne} />
              )}

              {mode === variant.order && (
                <div>
                  <Status statusCurrent={statusCurrent} />
                </div>
              )}
              {mode === variant.order && <p className={css['card__sum']}>${sum}</p>}
              {mode === variant.waiter && (
                <div className={css['card__status']}>
                  <StatusSelector
                    mode="dishes"
                    itemId={dishId}
                    currentStatus={currentSelectStatus}
                    changeStatusFunction={changeStatusFunction}
                  />
                </div>
              )}
              {mode === variant.cart && (
                <div className={css['card__icon-wrapper']}>
                  <IconButton
                    Svg={BiSolidTrash}
                    size={20}
                    onClick={onDelete}
                    color={'var(--color-red)'}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
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
  dishId: PropTypes.string,
};
