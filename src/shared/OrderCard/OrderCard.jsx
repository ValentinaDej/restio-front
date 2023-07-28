import React from 'react';
import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import cls from './OrderCard.module.scss';
import Status from 'shared/Status/Status';
import Button from 'shared/Button/Button';
import Text from 'shared/Text/Text';

const OrderCard = ({ _id, orderItems, status }) => {
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
            <Button mode={'outlined'} size={'sm'}>
              Request bill
            </Button>
            <Button size={'sm'}>Pay</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
