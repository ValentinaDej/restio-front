import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Status, Text, CheckBox, IconButton, Button, Loader } from 'shared';
import cls from './OrderCard.module.scss';

import { BiDish, BiChevronDown } from 'react-icons/bi';
import { classNames } from 'helpers/classNames';
import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { getDate } from 'helpers/getDate';

export const OrderCard = memo(
  ({
    _id,
    number,
    orderItems,
    created_at,
    status,
    сhecked,
    onChange,
    small,
    isWaiter,
    onChangeStatus,
    onChangeAllReadyDishes,
    isPayCard,
    isWaiterDishesPage,
    isLoadingReadyDishesUpdate,
    isLoadingChangeDishStatus,
  }) => {
    const cardRef = useRef(null);
    const [isChecked, setIsChecked] = useState(сhecked || false);
    const [isSmall, setIsSmall] = useState(small);
    let notServedDishes = 0;
    const totalPrice = orderItems.reduce((acc, { dish, quantity, status }) => {
      const price = acc + dish.price * quantity;
      if (status !== 'Served') {
        notServedDishes++;
      }
      return formatNumberWithTwoDecimals(price);
    }, 0);

    useEffect(() => {
      if (cardRef.current && !isSmall && small) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [isSmall, small]);

    const onChangeСheck = useCallback(() => {
      setIsChecked((prev) => !prev);
      if (onChange) {
        onChange(_id, totalPrice);
      }
    }, [_id, onChange, totalPrice]);

    const onClickMoreBtn = useCallback(() => {
      setIsSmall((prev) => !prev);
    }, []);

    const onChangeStatusByWaiter = useCallback(
      (dishId) => {
        const isResolved = onChangeStatus(dishId, _id);
        return isResolved;
      },
      [_id, onChangeStatus]
    );

    const isDishReady = orderItems.some(({ status }) => status === 'Ready');
    return (
      <AnimatePresence>
        <motion.div
          layout
          className={classNames(cls.item, { [cls.isSmall]: isSmall })}
          ref={cardRef}
        >
          <div className={cls.topBlock}>
            <Text fontWeight={700} classname={cls.text}>
              Order #{number}
            </Text>
            <div className={cls.dishes}>
              <BiDish size={20} />
              <Text fontWeight={700} classname={cls.text}>
                {orderItems.reduce((acc, item) => acc + item.quantity, 0)}
              </Text>
            </div>
            <Status statusCurrent={status} />
          </div>
          {isWaiter && (
            <Text fontWeight={700} textAlign="left" classname={cls.text}>
              {getDate(created_at)}
            </Text>
          )}
          <ul
            className={classNames(cls.list, {
              [cls.isSmall]: isSmall,
              [cls.isWaiterDishesPage]: isWaiterDishesPage,
            })}
          >
            {orderItems.map(({ dish: { _id, picture, name, price }, quantity, status }) => (
              <li key={_id}>
                <Card
                  src={picture}
                  title={name}
                  quantity={quantity}
                  price={price}
                  statusCurrent={status}
                  currentSelectStatus={status}
                  dishId={_id}
                  changeStatusFunction={onChangeStatusByWaiter}
                  mode={isWaiter && 'waiter'}
                  isLoading={isLoadingChangeDishStatus}
                />
              </li>
            ))}
          </ul>
          {!isWaiterDishesPage && (
            <>
              <div className={classNames(cls.bottomBlock, { [cls.isSmall]: isSmall })}>
                <Text
                  fontWeight={700}
                  classname={classNames(
                    cls.total,
                    { [cls.isSmall]: isSmall, [cls.isPaid]: status === 'Paid' },
                    []
                  )}
                >
                  Order total: ${totalPrice}
                </Text>

                {status !== 'Paid' && (
                  <CheckBox
                    label={'Select order'}
                    className={classNames(cls.centered, { [cls.isSmall]: isSmall })}
                    checked={isChecked}
                    onChange={onChangeСheck}
                    size={25}
                  />
                )}
              </div>
              {small && !isPayCard && (
                <IconButton
                  className={classNames(cls.btn, { [cls.isSmall]: isSmall })}
                  size={28}
                  onClick={onClickMoreBtn}
                  Svg={BiChevronDown}
                  mode={'filled'}
                />
              )}
            </>
          )}
          {isWaiterDishesPage && (
            <div
              className={classNames(cls.bottomBlock, {
                [cls.isWaiterDishesPage]: isWaiterDishesPage,
              })}
            >
              <Button
                className={cls.readyDishesBtn}
                size={'sm'}
                disabled={!isDishReady || isLoadingReadyDishesUpdate}
                onClick={() => onChangeAllReadyDishes(_id)}
              >
                {isLoadingReadyDishesUpdate ? (
                  <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
                ) : (
                  'Mark all ready dishes as served'
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }
);

OrderCard.propTypes = {
  _id: PropTypes.string,
  orderItems: PropTypes.array,
  status: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeAllReadyDishes: PropTypes.func,
  small: PropTypes.bool,
  isWaiterDishesPage: PropTypes.bool,
  isPayCard: PropTypes.bool,
  isLoadingReadyDishesUpdate: PropTypes.bool,
  isLoadingChangeDishStatus: PropTypes.bool,
};
