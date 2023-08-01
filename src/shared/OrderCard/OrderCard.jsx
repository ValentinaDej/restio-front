import React from 'react';
import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import cls from './OrderCard.module.scss';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { useCallback } from 'react';
import { useState } from 'react';
import { memo } from 'react';

const OrderCard = memo(({ _id, orderItems, status, isChecked, onChangePayAction }) => {
  const [isCheckedPay, setIsCheckedPay] = useState(isChecked || false);
  const totalPrice = orderItems.reduce((acc, { dish, quantity }) => {
    const price = acc + dish.price * quantity;
    return Math.round(price * 100) / 100;
  }, 0);

  const onChangePay = useCallback(() => {
    setIsCheckedPay((prev) => !prev);
    if (onChangePayAction) {
      onChangePayAction({ _id, totalPrice });
    }
  }, [_id, onChangePayAction, totalPrice]);

  return (
    <div className={cls.item}>
      <div className={cls.topBlock}>
        <Title mode={'h3'} fontSize={12} textAlign="left" classname={cls.text}>
          Order #{_id}
        </Title>
        <Status statusCurrent={status} />
      </div>
      <Text fontWeight={700} classname={cls.text}>
        Dishes
      </Text>
      <ul className={cls.list}>
        {orderItems.map(({ dish: { _id, picture, name, price }, quantity }) => (
          <Card key={_id} src={picture} title={name} quantity={quantity} price={price} />
        ))}
      </ul>
      <Text fontWeight={700} classname={cls.text}>
        Order total: ${totalPrice}
      </Text>
      <div className={cls.bottomBlock}>
        {status === 'Paid' ? (
          <div className={cls.status}>
            <Status statusCurrent={'Success'} />
          </div>
        ) : (
          <CheckBox
            label={'Select order'}
            className={cls.checkBox}
            checked={isCheckedPay}
            onChange={onChangePay}
            size={25}
          />
        )}
      </div>
    </div>
  );
});

export default OrderCard;
