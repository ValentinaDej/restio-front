import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import css from '../../Card/Card.module.scss';
import styles from './CardSkeleton.module.scss';

const variant = {
  order: 'order',
  cart: 'cart',
  waiter: 'waiter',
  cook: 'cook',
};

const CardSkeleton = ({ mode = variant.order, ...props }) => {
  return (
    <div className={css['card']}>
      <div className={css['card__image-container']}>
        <Skeleton circle height="100%" />
      </div>
      <div className={css['card__wrapper']}>
        <div className={css['card__flex-container']}>
          <Skeleton width={100} height={20} />

          {mode === variant.cart && (
            <div className={css['card__icon-wrapper']} style={{ marginRight: 0 }}>
              <Skeleton width={30} height={20} />
            </div>
          )}
        </div>

        <div className={css['card__flex-container']} style={{ justifyContent: 'space-between' }}>
          {mode === variant.cart && <Skeleton width={30} height={20} />}
          {mode === variant.waiter && <Skeleton width={30} height={20} />}
          {mode === variant.cook && (
            <>
              <Skeleton width={30} height={20} />
            </>
          )}
          {mode === variant.order && (
            <>
              <Skeleton width={30} height={20} />
            </>
          )}

          {mode === variant.cart && <Skeleton width={30} height={20} />}

          {mode === variant.order && <Skeleton width={30} height={20} />}
        </div>
      </div>
      {mode === variant.waiter && (
        <div className={`${styles.cardSkeleton__waiter}`}>
          <Skeleton circle width={30} height={30} />
        </div>
      )}
    </div>
  );
};

CardSkeleton.propTypes = {
  mode: PropTypes.string,
};

export default CardSkeleton;
