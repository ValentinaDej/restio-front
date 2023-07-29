import React from 'react';
import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import cls from './OrderCard.module.scss';
import Status from 'shared/Status/Status';
import Text from 'shared/Text/Text';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { useCallback } from 'react';
import { useState } from 'react';

const OrderCard = ({ _id, orderItems, status, checkedPay, checkedBill }) => {
  const [isCheckedPay, setIsCheckedPay] = useState(checkedPay || false);
  const [isCheckedBill, setIsCheckedBill] = useState(checkedBill || false);
  const onChangePay = useCallback(() => {
    setIsCheckedPay((prev) => !prev);
  }, []);
  const onChangeBill = useCallback(() => {
    setIsCheckedBill((prev) => !prev);
  }, []);

  const totalPrice = orderItems.reduce((acc, { dish, quantity }) => acc + dish.price * quantity, 0);
  return (
    <div className={cls.item}>
      <div className={cls.topBlock}>
        <Title mode={'h3'} fontSize={12} textAlign="left">
          Order #{_id}
        </Title>
        <Status statusCurrent={status} />
      </div>
      <ul className={cls.list}>
        {orderItems.map(({ dish: { _id, picture, name, price }, quantity }) => (
          <Card key={_id} src={picture} title={name} quantity={quantity} price={price} />
        ))}
      </ul>
      <Text>Total: ${totalPrice}</Text>
      <div className={cls.bottomBlock}>
        {status === 'Paid' ? (
          <div className={cls.status}>
            <Status statusCurrent={'Success'} />
          </div>
        ) : (
          <>
            <CheckBox
              label={'Request bill'}
              checked={isCheckedBill}
              onChange={onChangeBill}
              size={25}
            />

            <CheckBox
              label={'Pay online'}
              checked={isCheckedPay}
              onChange={onChangePay}
              size={25}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
