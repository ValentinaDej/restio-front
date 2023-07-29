import Text from 'shared/Text/Text';
import cls from './Checkout.module.scss';
import Button from 'shared/Button/Button';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useState } from 'react';
import { classNames } from 'helpers/classNames';
import Modal from 'shared/Modal/Modal';
import { useCallback } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickPaidAllBtn = useCallback(async () => {
    const { data } = await axios.post('http://localhost:3001/transactions', {
      amount: 250,
      order_id: '64c2bdc95c1b58e890309955',
      type: 'online',
    });
    location.href = `https://www.liqpay.ua/api/3/checkout?data=${data.paymentData.data}&signature=${data.paymentData.signature}`;
  }, []);

  const mods = {
    [cls.isOpen]: isOpen,
  };

  return (
    <>
      <div className={classNames(cls.box, mods, [])}>
        <div className={cls.checkoutBtn}>
          <Button onClick={onOpenModal} size={isOpen ? 'sm' : 'md'}>
            {isOpen ? <AiOutlineArrowDown size={25} /> : `Checkout $${250}`}
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal setIsModalOpen={onOpenModal}>
          <Text color="#000" fontWeight={700}>
            Total price: ${250}
          </Text>
          <div className={cls.btnsBox}>
            <Button size={'sm'} mode={'outlined'}>
              Pay online selected
            </Button>
            <Button size={'sm'} onClick={onClickPaidAllBtn}>
              Pay online all
            </Button>
          </div>
          <div className={cls.btnsBox}>
            <Button size={'sm'} mode={'outlined'}>
              Request bill selected
            </Button>
            <Button size={'sm'}>Request bill all</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
