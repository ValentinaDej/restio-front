import { useUpdateOrderStatusByWaiter } from 'api/order';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/Button/Button';
import Loader from 'shared/Loader/Loader';
import Text from 'shared/Text/Text';
import { BillDownload } from '../BillDownload/BillDownload';
import PropTypes from 'prop-types';
import { payOrders } from 'store/customer/orders/asyncOperations';
import cls from './ListTopBox.module.scss';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { getUserId } from 'store/auth/authSelector';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { classNames } from 'helpers/classNames';

export const ListTopBox = ({
  orders,
  totalPrice,
  onChangeSelected,
  urlParams,
  isWaiter,
  onChangeTypeOfPay,
  paymentType,
  allOrderPrice,
}) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const userId = useSelector(getUserId);
  const [ordersIDs, setOrdersIDs] = useState([]);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(
    urlParams,
    ordersIDs,
    totalPrice,
    userId,
    paymentType
  );
  const frontLink = location.href;

  useEffect(() => {
    const updateOrdersIds = orders
      .filter((order) => order.status !== 'Paid')
      .map((order) => order._id);

    setOrdersIDs(updateOrdersIds);
  }, [orders]);

  const onClickPayAllAsCustomer = useCallback(() => {
    dispatch(
      payOrders({
        rest_id: urlParams.restId,
        amount: totalPrice,
        info: ordersIDs.join(','),
        frontLink,
      })
    );
  }, [dispatch, frontLink, ordersIDs, totalPrice, urlParams.restId]);

  const onClickMarkAsPaidAllAsWaiter = useCallback(() => {
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

  return (
    <div className={cls.box}>
      <div>
        <div className={cls.totalText}>
          {totalPrice === 0 ? (
            isWaiter ? (
              <Text fontWeight={700} fontSize={20} classname={cls.text}>
                All orders paid, mark table as free when customer leave.
              </Text>
            ) : (
              <Text fontWeight={700} fontSize={20} classname={cls.text}>
                All orders are paid, thank you for visiting our restaurant.
              </Text>
            )
          ) : (
            <>
              <Text fontWeight={700} fontSize={20} classname={cls.text}>
                Bill Total: ${allOrderPrice}
              </Text>
              <Text fontWeight={700} fontSize={20} classname={cls.text}>
                Unpaid: ${totalPrice}
              </Text>
            </>
          )}
        </div>
      </div>
      <div className={classNames(cls.btnsBox, { [cls.isWaiter]: isWaiter })}>
        <div className={cls.btns}>
          <BillDownload orders={orders || []} />
          <Button
            size={'sm'}
            onClick={isWaiter ? onClickMarkAsPaidAllAsWaiter : onClickPayAllAsCustomer}
            mode={(!totalPrice || isLoading || (isWaiter && !paymentType)) && 'disabled'}
            className={cls.btn}
          >
            {modalIsOpen ? (
              <Loader size={'xs'} color={'var(--color-gray-700)'} className={cls.loader} />
            ) : (
              <>
                {isWaiter ? (
                  isLoading ? (
                    <Loader size={'xs'} color={'var(--color-gray-700)'} className={cls.loader} />
                  ) : (
                    'Mark as paid all orders'
                  )
                ) : (
                  'Pay online'
                )}
              </>
            )}
          </Button>
        </div>
        {isWaiter && (
          <div className={cls.checkboxes}>
            <CheckBox
              label="Cash"
              onChange={onChangeTypeOfPay}
              ariaLabel="cash"
              disabled={paymentType === 'POS'}
              size={22}
            />
            <CheckBox
              label="Terminal"
              onChange={onChangeTypeOfPay}
              ariaLabel="POS"
              disabled={paymentType === 'cash'}
              size={22}
            />
          </div>
        )}
      </div>
      <Text classname={cls.text}>
        {isWaiter
          ? 'Or select those orders that the customer has paid by selecting the ones you need.'
          : 'Or you can pay for each order separately by selecting the ones you need.'}
      </Text>
      {isWaiter && (
        <ConfirmModal
          isOpen={modalIsOpen}
          message={`Confirm your action for ${ordersIDs.length} ${
            ordersIDs?.length === 1 ? 'order' : 'orders'
          } with total $${totalPrice}`}
          onConfirm={() => setIsConfirmed(true)}
          setIsOpen={onClickMarkAsPaidAllAsWaiter}
          onCancel={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
};

ListTopBox.propTypes = {
  isWaiter: PropTypes.bool,
  urlParams: PropTypes.object,
  orders: PropTypes.array,
  totalPrice: PropTypes.number,
  onChangeSelected: PropTypes.func,
};
