import { useState } from 'react';
import PropTypes from 'prop-types';
import cls from './DownloadBill.module.scss';
import Button from 'shared/Button/Button';
import Modal from 'shared/Modal/Modal';
import Loader from 'shared/Loader/Loader';
import { classNames } from 'helpers/classNames';

export const DownloadBill = ({ isWaiter, orders, urlParams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printData, setPrintData] = useState([]);

  const getPrintData = () => {
    const groupedDishes = {};

    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const { name, price } = item.dish;
        if (!groupedDishes[name]) {
          groupedDishes[name] = { price, quantity: 0, amount: 0 };
        }
        groupedDishes[name].quantity += item.quantity;
        groupedDishes[name].amount += item.quantity * price;
      });
    });
    return Object.keys(groupedDishes).map((name) => {
      const { price, quantity, amount } = groupedDishes[name];
      return { name, price, quantity, amount };
    });
  };

  const onClickDownloadAsWaiter = () => {
    console.log(orders);
  };

  const onClickDownloadAsCustomer = () => {
    const printData = getPrintData();
    setPrintData(printData);
    setIsModalOpen(true);
    console.log(orders);
    console.log(printData);
  };

  return (
    <>
      <div className={classNames(cls.box, { [cls.isWaiter]: isWaiter }, [])}>
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          {printData.map((data, index) => (
            <div key={index}>
              {data.name}, {data.price}, {data.quantity}, {data.amount}
            </div>
          ))}
        </Modal>
        <div className={cls.btnsBox}>
          <Button
            size={'sm'}
            onClick={isWaiter ? onClickDownloadAsWaiter : onClickDownloadAsCustomer}
            //   mode={(!totalPrice || isLoading) && 'disabled'}
            className={cls.btn}
          >
            {isWaiter ? isLoading ? <Loader size={'xs'} /> : 'Download & Print' : 'Download'}
          </Button>
        </div>
      </div>
      {/* {payment && (
        <div className={cls.layout}>
          <Loader />
        </div>
      )} */}
    </>
  );
};

DownloadBill.propTypes = {
  isWaiter: PropTypes.bool,
};
