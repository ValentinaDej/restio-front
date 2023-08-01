import Text from 'shared/Text/Text';
import cls from './Checkout.module.scss';
import Button from 'shared/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useCallback, useEffect } from 'react';
import { classNames } from 'helpers/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getAmount, getPaymentInfo, getSelectedOrders } from 'store/customer/orders/selectors';

const testdata = ['64c58973860d0119306ee2b1', '64c58973860d0119306ee2b2'];
export const Checkout = () => {
  const dispatch = useDispatch();
  const selectedOrders = useSelector(getSelectedOrders);
  const [isOpen, setIsOpen] = useState(false);
  const { data, signature } = useSelector(getPaymentInfo);
  const amount = useSelector(getAmount);

  useEffect(() => {
    if (data && signature) {
      location.href = `${process.env.REACT_APP_LIQPAY_BASE_URL}/checkout?data=${data}&signature=${signature}`;
    }
  }, [data, signature]);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickPaySelected = useCallback(() => {
    dispatch(
      payOrders({
        amount,
        // order_id[0]
        order_id: '64c58973860d0119306ee2b1',
        type: 'online',
        // add selectedOrders
        info: testdata.join(','),
      })
    );
  }, [amount, dispatch]);

  const boxMods = {
    [cls.isOpen]: isOpen,
  };
  const checkoutBtnMods = {
    [cls.isShown]: amount !== 0,
    [cls.isOpen]: isOpen,
  };

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
          <Button size={'sm'} mode={'outlined'}>
            Request bill
          </Button>
          <Button size={'sm'} onClick={onClickPaySelected}>
            Pay online
          </Button>
        </div>
      </div>
    </>
  );
};
