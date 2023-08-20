import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import css from '../../DishCard/DishCard.module.scss';
import styles from './DishCardSkeleton.module.scss';

export const DishCardSkeleton = ({ ...props }) => {
  return (
    <div className={css['card-container']}>
      <div className={css['card-container__image-wrapper']}>
        <Skeleton circle height="100%" />
      </div>
      <div className={css['card-container__wrapper']}>
        <Skeleton width={100} height={25} />
        <Skeleton width={30} height={20} />
      </div>
      <Skeleton height={20} className={`${styles.skeleton__ingredients}`} />
      <div className={css['card-container__wrapper']}>
        <Skeleton height={30} width={40} />
        <Skeleton height={24} width={24} borderRadius={12} />
      </div>
    </div>
  );
};
