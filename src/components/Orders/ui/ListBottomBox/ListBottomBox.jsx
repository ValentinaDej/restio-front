import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import cls from './ListBottomBox.module.scss';
import { Text, Button } from 'shared';
import { classNames } from 'helpers/classNames';
import { payOrders } from 'store/customer/orders/asyncOperations';
import { getPaymentInfo } from 'store/customer/orders/selectors';

import { useMediaQuery } from 'react-responsive';

export const ListBottomBox = ({ amount, selectedOrders, urlParams, totalPrice }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: '(max-width: 767.98px)',
  });

  const { data, signature } = useSelector(getPaymentInfo);
  const [isOpen, setIsOpen] = useState(false);

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
        rest_id: urlParams.restId,
        amount,
        info: selectedOrders.join(','),
        frontLink,
      })
    );
  }, [amount, dispatch, frontLink, selectedOrders, urlParams.restId]);

  if (!isMobile && totalPrice !== 0) {
    return (
      <div className={cls.descBtn}>
        <Text classname={cls.text} fontWeight={700}>
          Total price for selected orders: ${amount}
        </Text>
        <div className={cls.btnsBox}>
          <Button
            size={isMobile ? 'sm' : 'md'}
            onClick={onClickPaySelectedAsCustomer}
            disabled={amount === 0}
            className={cls.btnSelected}
          >
            {isMobile ? 'Pay online' : 'Pay online selected'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    isMobile && (
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
            {isOpen ? (
              <AiOutlineClose size={25} />
            ) : (
              <>Go to checkout selected &middot; ${amount}</>
            )}
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
    )
  );
};

ListBottomBox.propTypes = {
  amount: PropTypes.number,
  totalPrice: PropTypes.number,
  selectedOrders: PropTypes.array,
  urlParams: PropTypes.object,
};
