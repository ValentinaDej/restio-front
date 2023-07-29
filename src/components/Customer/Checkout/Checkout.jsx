import Text from 'shared/Text/Text';
import cls from './Checkout.module.scss';
import Button from 'shared/Button/Button';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useState } from 'react';
import { classNames } from 'helpers/classNames';
import Modal from 'shared/Modal/Modal';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getDataParams, getPaymentInfo } from 'store/customer/orders/selectors';
import { useEffect } from 'react';
import { memo } from 'react';

export const Checkout = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, signature } = useSelector(getPaymentInfo);
  const dataParams = useSelector(getDataParams);

  useEffect(() => {
    if (data && signature) {
      location.href = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;
    }
  }, [data, signature]);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickPaidAllBtn = useCallback(() => {
    dispatch(payOrders(dataParams));
  }, [dataParams, dispatch]);

  const mods = {
    [cls.isOpen]: isOpen,
  };

  return (
    <>
      <div className={classNames(cls.box, mods, [])}>
        <div className={cls.checkoutBtn}>
          <Button onClick={onOpenModal} size={isOpen ? 'sm' : 'md'}>
            {isOpen ? <AiOutlineArrowDown size={25} /> : `Checkout $${dataParams.amount}`}
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal setIsModalOpen={onOpenModal}>
          <Text color="#000" fontWeight={700}>
            Total price: ${dataParams.amount}
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
});
