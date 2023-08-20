import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Text from 'shared/Text/Text';
import Button from 'shared/Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { classNames } from 'helpers/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getPaymentInfo } from 'store/customer/orders/selectors';
import Loader from 'shared/Loader/Loader';
import { useUpdateOrderStatusByWaiter, useUpdateTableStatusByWaiter } from 'api/order';
import { getUserId } from 'store/auth/authSelector';
import { errorMessage } from 'helpers/errorMessage';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import cls from './Checkout.module.scss';

export const Checkout = ({
  isWaiter,
  amount,
  selectedOrders,
  onChangeSelected,
  urlParams,
  isAllOrdersPaid,
  paymentType,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const userId = useSelector(getUserId);
  const { data, signature } = useSelector(getPaymentInfo);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(
    urlParams,
    selectedOrders,
    amount,
    userId,
    paymentType
  );
  const {
    isLoading: isLoadingTableStatus,
    mutate: mutateTableStatus,
    isError,
    error,
  } = useUpdateTableStatusByWaiter(urlParams, 'Free');
  const frontLink = location.href;

  useEffect(() => {
    if (data && signature) {
      location.href = `${process.env.REACT_APP_LIQPAY_BASE_URL}/checkout?data=${data}&signature=${signature}`;
    }
    if (isError) {
      errorMessage(error?.response.data.message);
    }
  }, [data, error, isError, signature]);

  const onOpenModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickPaySelectedAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        rest_id: urlParams.restId,
        amount,
        info: selectedOrders.join(','),
        frontLink,
      })
    );
  }, [amount, dispatch, frontLink, selectedOrders, urlParams.restId]);

  const onClickMarkAsFreeTable = useCallback(() => {
    mutateTableStatus();
  }, [mutateTableStatus]);

  const onClickMarkAsPaidSelectedAsWaiter = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      mutate();
      onChangeSelected(0, []);
      setModalIsOpen(false);
      setIsConfirmed(false);
    }
  }, [isConfirmed, mutate, onChangeSelected]);

  if (isWaiter) {
    return (
      <div className={cls.waiterBtn}>
        {totalPrice !== 0 && (
          <Text classname={cls.text} fontWeight={700}>
            Total price for selected orders: ${amount}
          </Text>
        )}
        <div className={cls.btnsBox}>
          {totalPrice !== 0 && (
            <Button
              size={'sm'}
              onClick={onClickMarkAsPaidSelectedAsWaiter}
              disabled={amount === 0 || isLoading || !paymentType}
              className={cls.btn}
              mode="outlined"
            >
              {modalIsOpen ? (
                <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
              ) : (
                <>
                  {isLoading ? (
                    <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
                  ) : (
                    'Mark as paid for selected'
                  )}
                </>
              )}
            </Button>
          )}
          <Button
            size={'sm'}
            onClick={onClickMarkAsFreeTable}
            disabled={!isAllOrdersPaid}
            className={cls.btn}
          >
            {isLoadingTableStatus ? (
              <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
            ) : (
              'Mark table as free'
            )}
          </Button>
        </div>
        <ConfirmModal
          isOpen={modalIsOpen}
          message={`Confirm your action for ${selectedOrders?.length} ${
            selectedOrders?.length === 1 ? 'order' : 'orders'
          } with total $${amount}`}
          onConfirm={() => setIsConfirmed(true)}
          setIsOpen={onClickMarkAsPaidSelectedAsWaiter}
          onCancel={() => setModalIsOpen(false)}
        />
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

Checkout.propTypes = {
  isWaiter: PropTypes.bool,
  amount: PropTypes.number,
  selectedOrders: PropTypes.array,
  onChangeSelected: PropTypes.func,
  urlParams: PropTypes.object,
  isAllOrdersPaid: PropTypes.bool,
  paymentType: PropTypes.string,
};
