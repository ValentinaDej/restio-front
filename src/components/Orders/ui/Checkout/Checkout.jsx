import Text from 'shared/Text/Text';
import cls from './Checkout.module.scss';
import Button from 'shared/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useCallback, useEffect } from 'react';
import { classNames } from 'helpers/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getPaymentInfo } from 'store/customer/orders/selectors';
import { useUpdateOrderStatusByWaiter, useUpdateTableStatusByWaiter } from 'api/service';
import Loader from 'shared/Loader/Loader';

export const Checkout = ({
  isWaiter,
  amount,
  selectedOrders,
  onChangeSelected,
  urlParams,
  isAllOrdersPaid,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(urlParams, selectedOrders);
  const { isLoadingTableStatus, mutate: mutateTableStatus } = useUpdateTableStatusByWaiter(
    urlParams,
    'Free'
  );
  const { data, signature } = useSelector(getPaymentInfo);
  const frontLink = location.href;

  useEffect(() => {
    if (data && signature) {
      location.href = `${process.env.REACT_APP_LIQPAY_BASE_URL}/checkout?data=${data}&signature=${signature}`;
    }
  }, [data, signature]);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickPaySelectedAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        amount,
        type: 'online',
        info: selectedOrders.join(','),
        frontLink,
      })
    );
  }, [amount, dispatch, frontLink, selectedOrders]);

  const onClickMarkAsPaidSelectedAsWaiter = useCallback(() => {
    mutate();
    onChangeSelected(0, []);
  }, [mutate, onChangeSelected]);

  const onClickMarkAsFreeTable = useCallback(() => {
    mutateTableStatus();
  }, [mutateTableStatus]);

  if (isWaiter) {
    return (
      <div className={cls.waiterBtn}>
        <Text classname={cls.text} fontWeight={700}>
          Total price for selected orders: ${amount}
        </Text>
        <div className={cls.btnsBox}>
          <Button
            size={'sm'}
            onClick={onClickMarkAsPaidSelectedAsWaiter}
            disabled={amount === 0 || isLoading}
            className={cls.btn}
          >
            {isLoading ? <Loader size={'xs'} /> : 'Mark as paid for selected'}
          </Button>
          <Button
            size={'sm'}
            onClick={onClickMarkAsFreeTable}
            disabled={!isAllOrdersPaid}
            className={cls.btn}
          >
            {isLoadingTableStatus ? <Loader size={'xs'} /> : 'Mark table as free'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={classNames(cls.box, {
          [cls.isOpen]: isOpen && amount !== 0,
        })}
      >
        <Button
          className={classNames(cls.checkoutBtn, {
            [cls.isShown]: amount !== 0,
            [cls.isOpen]: isOpen,
          })}
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
