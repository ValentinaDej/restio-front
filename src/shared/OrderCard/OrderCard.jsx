import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import cls from './OrderCard.module.scss';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { useCallback } from 'react';
import { useState } from 'react';
import { BiDish, BiChevronDown } from 'react-icons/bi';
import { memo } from 'react';
import { classNames } from 'helpers/classNames';
import { IconButton } from 'shared/IconButton/IconButton';

const OrderCard = memo(({ _id, orderItems, status, isChecked, onChange, small }) => {
  const [isCheckedPay, setIsCheckedPay] = useState(isChecked || false);
  const [isSmall, setIsSmall] = useState(small);
  const cardRef = useRef(null);
  const totalPrice = orderItems.reduce((acc, { dish, quantity }) => {
    const price = acc + dish.price * quantity;
    return Math.round(price * 100) / 100;
  }, 0);

  useEffect(() => {
    if (cardRef.current && !isSmall && small) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isSmall, small]);

  const onChangePay = useCallback(() => {
    setIsCheckedPay((prev) => !prev);
    if (onChange) {
      onChange({ _id, totalPrice });
    }
  }, [_id, onChange, totalPrice]);

  const onClickMoreBtn = useCallback(() => {
    setIsSmall((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.item, { [cls.isSmall]: isSmall }, [])} ref={cardRef}>
      <div className={cls.topBlock}>
        <Title mode={'h3'} fontSize={12} textAlign="left" classname={cls.text}>
          Order #{_id}
        </Title>
        <div className={cls.dishes}>
          <BiDish size={20} />
          <Text fontWeight={700} classname={cls.text}>
            {orderItems.length}
          </Text>
        </div>
        <Status statusCurrent={status} />
      </div>
      <ul className={classNames(cls.list, { [cls.isSmall]: isSmall }, [])}>
        {orderItems.map(({ dish: { _id, picture, name, price }, quantity }) => (
          <Card key={_id} src={picture} title={name} quantity={quantity} price={price} />
        ))}
      </ul>
      <Text fontWeight={700} classname={classNames(cls.total, { [cls.isSmall]: isSmall }, [])}>
        Order total: ${totalPrice}
      </Text>
      <div className={classNames(cls.bottomBlock, { [cls.isSmall]: isSmall }, [])}>
        {status === 'Paid' ? (
          <div className={classNames(cls.centered, { [cls.isSmall]: isSmall }, [])}>
            <Status statusCurrent={'Success'} />
          </div>
        ) : (
          <CheckBox
            label={'Select order'}
            className={classNames(cls.centered, { [cls.isSmall]: isSmall }, [])}
            checked={isCheckedPay}
            onChange={onChangePay}
            size={25}
          />
        )}
      </div>
      {small && (
        <IconButton
          className={classNames(cls.btn, { [cls.isSmall]: isSmall }, [])}
          size={28}
          onClick={onClickMoreBtn}
          Svg={BiChevronDown}
          mode={'filled'}
        />
      )}
    </div>
  );
});

OrderCard.propTypes = {
  _id: PropTypes.string,
  orderItems: PropTypes.array,
  status: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  small: PropTypes.bool,
};

export default OrderCard;
