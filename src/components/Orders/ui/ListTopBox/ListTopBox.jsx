import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import cls from './ListTopBox.module.scss';
import { useUpdateOrderStatusByWaiter, useUpdateTableStatusByWaiter } from 'api/order';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { classNames } from 'helpers/classNames';
import { errorMessage } from 'helpers/errorMessage';
import { Button, Loader, Text, CheckBox } from 'shared';
import { ConfirmModal } from 'components';
import { BillDownload } from '../BillDownload/BillDownload';

export const ListTopBox = ({
  orders,
  totalPrice,
  amount,
  onChangeSelected,
  selectedOrders,
  urlParams,
  isWaiter,
  onChangeTypeOfPay,
  paymentType,
  allOrderPrice,
  isAllOrdersPaid,
}) => {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ordersIDs, setOrdersIDs] = useState([]);
  const [isSelectedOrders, setIsSelectedOrders] = useState(false);
  const { isLoading, mutate } = useUpdateOrderStatusByWaiter(urlParams, totalPrice, paymentType);
  const {
    isLoading: isLoadingTableStatus,
    mutate: mutateTableStatus,
    isError,
    error,
  } = useUpdateTableStatusByWaiter(urlParams, 'Free');
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
      if (isSelectedOrders) {
        mutate(selectedOrders);
        setIsSelectedOrders(false);
      } else {
        mutate(ordersIDs);
      }
      onChangeSelected(0, []);
      setModalIsOpen(false);
      setIsConfirmed(false);
    }
  }, [isConfirmed, isSelectedOrders, mutate, onChangeSelected, ordersIDs, selectedOrders]);

  const onClickMarkAsFreeTable = useCallback(() => {
    mutateTableStatus();
  }, [mutateTableStatus]);

  const onClickMarkAsPaidSelectedAsWaiter = useCallback(() => {
    setModalIsOpen(true);
    setIsSelectedOrders(true);
  }, []);

  useEffect(() => {
    if (isError) {
      errorMessage(error?.response.data.message);
    }
  }, [error?.response.data.message, isError]);

  const selectedMessage =
    amount === 0 ? `Mark as paid for selected` : `Mark as paid for selected $${amount}`;

  return (
    <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
      <div>
        <div className={cls.totalText}>
          {totalPrice === 0 ? (
            isWaiter ? (
              <Text fontWeight={700} classname={cls.text}>
                All orders paid, mark table as free when customer leave.
              </Text>
            ) : (
              <Text fontWeight={700} classname={cls.text}>
                All orders are paid, thank you for visiting our restaurant.
              </Text>
            )
          ) : (
            <>
              <Text fontWeight={700} classname={cls.text}>
                Bill Total: ${allOrderPrice}
              </Text>
              <Text fontWeight={700} classname={cls.text}>
                Unpaid: ${totalPrice}
              </Text>
            </>
          )}
        </div>
      </div>
      {totalPrice === 0 ? (
        <div className={classNames(cls.btnsBox, { [cls.isWaiter]: isWaiter })}>
          <BillDownload orders={orders || []} />
          {isWaiter && (
            <Button
              size={'sm'}
              onClick={onClickMarkAsFreeTable}
              disabled={!isAllOrdersPaid || isLoadingTableStatus}
              className={cls.btn}
            >
              {isLoadingTableStatus ? (
                <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
              ) : (
                'Mark table as free'
              )}
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className={classNames(cls.btnsBox, { [cls.isWaiter]: isWaiter })}>
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
            <div className={cls.btns}>
              <BillDownload orders={orders || []} />
              <Button
                size={'sm'}
                onClick={isWaiter ? onClickMarkAsPaidAllAsWaiter : onClickPayAllAsCustomer}
                mode={(!totalPrice || isLoading || (isWaiter && !paymentType)) && 'disabled'}
                className={cls.btn}
              >
                {modalIsOpen ? (
                  <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
                ) : (
                  <>
                    {isWaiter ? (
                      isLoading ? (
                        <Loader size={'xs'} color={'var(--color-status)'} className={cls.loader} />
                      ) : (
                        'Mark as paid all orders'
                      )
                    ) : (
                      'Pay online'
                    )}
                  </>
                )}
              </Button>
              <div className={cls.btnsBox}>
                {totalPrice !== 0 && isWaiter && (
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
                          <Loader
                            size={'xs'}
                            color={'var(--color-status)'}
                            className={cls.loader}
                          />
                        ) : (
                          `${selectedMessage}`
                        )}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Text classname={cls.text}>
            {isWaiter
              ? 'Or select those orders that the customer has paid by selecting the ones you need.'
              : 'Or you can pay for each order separately by selecting the ones you need.'}
          </Text>
        </>
      )}
      {isWaiter && isSelectedOrders ? (
        <ConfirmModal
          isOpen={modalIsOpen}
          message={`Confirm your action for ${selectedOrders?.length} ${
            selectedOrders?.length === 1 ? 'order' : 'orders'
          } with total $${amount}`}
          onConfirm={() => setIsConfirmed(true)}
          setIsOpen={onClickMarkAsPaidSelectedAsWaiter}
          onCancel={() => {
            setModalIsOpen(false);
            setIsSelectedOrders(false);
          }}
        />
      ) : (
        <ConfirmModal
          isOpen={modalIsOpen}
          message={`Confirm your action for ${ordersIDs.length} ${
            ordersIDs?.length === 1 ? 'order' : 'orders'
          } with total $${totalPrice}`}
          onConfirm={() => setIsConfirmed(true)}
          setIsOpen={onClickMarkAsPaidSelectedAsWaiter}
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
  onChangeTypeOfPay: PropTypes.func,
  isAllOrdersPaid: PropTypes.bool,
  allOrderPrice: PropTypes.number,
};
