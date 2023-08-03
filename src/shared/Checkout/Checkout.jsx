import Text from 'shared/Text/Text';
import cls from './Checkout.module.scss';
import Button from 'shared/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useCallback, useEffect } from 'react';
import { classNames } from 'helpers/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getPaymentInfo } from 'store/customer/orders/selectors';

export const Checkout = ({ isWaiter, amount, selectedOrders }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { data, signature } = useSelector(getPaymentInfo);
  useEffect(() => {
    if (data && signature) {
      location.href = `${process.env.REACT_APP_LIQPAY_BASE_URL}/checkout?data=${data}&signature=${signature}`;
    }
  }, [data, signature]);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const frontLink = location.href;
  const onClickPaySelectedAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        amount,
        order_id: selectedOrders[0],
        type: 'online',
        info: selectedOrders.join(','),
        frontLink,
      })
    );
  }, [amount, dispatch, frontLink, selectedOrders]);
  const onClickMarkAsPaidSelectedAsWaiter = useCallback(() => {
    //need to update orders status
  }, []);

  const boxMods = {
    [cls.isOpen]: isOpen && amount !== 0,
  };
  const checkoutBtnMods = {
    [cls.isShown]: amount !== 0,
    [cls.isOpen]: isOpen,
  };

  if (isWaiter) {
    return (
      <div className={cls.waiterBtn}>
        <Text classname={cls.text} fontWeight={700}>
          Total price for selected orders: ${amount}
        </Text>
        <Button size={'sm'} onClick={onClickMarkAsPaidSelectedAsWaiter} disabled={amount === 0}>
          Mark as paid for selected
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={classNames(cls.box, boxMods, [])}>
        <Button
          className={classNames(cls.checkoutBtn, checkoutBtnMods, [])}
          onClick={onOpenModal}
          size={isOpen ? 'sm' : 'md'}
          disabled={amount === 0}
        >
          {isOpen ? <AiOutlineClose size={25} /> : <>Go to checkout selected &middot; ${amount}</>}
        </Button>
        <Text classname={cls.text} fontWeight={700}>
          Total price for selected orders: ${amount}
        </Text>
        <div className={cls.btnsBox}>
          <Button size={'sm'} onClick={onClickPaySelectedAsCustomer} disabled={amount === 0}>
            Pay online
          </Button>
        </div>
      </div>
    </>
  );
};
