import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { toast } from 'react-hot-toast';

import { LiaDownloadSolid } from 'react-icons/lia';
import Button from 'shared/Button/Button';
import Modal from 'shared/Modal/Modal';
import Loader from 'shared/Loader/Loader';

import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { getRestaurant } from 'api/restaurant';
import { classNames } from 'helpers/classNames';
import cls from './DownloadBill.module.scss';

const BillInfo = ({ setIsModalOpen, isModalOpen, orders, restId }) => {
  const { data, isLoading, isError } = useQuery(['restaurant', restId], async () => {
    const result = await getRestaurant(restId);
    return result;
  });

  if (isLoading) {
    return <Loader size="lg" />;
  }
  //   console.log('isError', isError);
  if (isError) {
    toast.error('Something went wrong... Please call the waiter');
  }

  const getOrderData = () => {
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

  const printData = getOrderData();

  const downloadBillPdf = () => {
    const pdf = new jsPDF();

    // Визначаємо координати для початку виводу контенту на PDF
    let y = 20;

    // Виводимо обов'язкові поля
    pdf.text('Restaurant Name: My Restaurant', 20, y);
    y += 10;
    pdf.text('Date: July 30, 2023', 20, y);
    y += 10;
    pdf.text('Table Number: 5', 20, y);
    y += 20;

    // Виводимо заголовки для колонок
    pdf.text('Name', 20, y);
    pdf.text('Quantity', 90, y);
    pdf.text('Unit Price', 120, y);
    pdf.text('Total Price', 150, y);
    y += 10;

    // Проходимося по кожному елементу даних для PDF
    printData.forEach((data, index) => {
      // Виводимо дані на PDF
      pdf.text(data.name, 20, y);
      pdf.text(data.price.toString(), 90, y);
      pdf.text(data.quantity.toString(), 120, y);
      pdf.text(data.amount.toString(), 150, y);

      // Збільшуємо координату y для наступного рядка
      y += 10;
    });

    // Обчислюємо підсумок
    const subtotal = printData.reduce((total, data) => total + data.amount, 0);
    y += 10;
    pdf.text(`Subtotal: $${subtotal}`, 20, y);

    // Зберігаємо PDF документ
    pdf.save('bill.pdf');
  };

  return (
    <div>
      {!isError && (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          <div>
            <LiaDownloadSolid onClick={downloadBillPdf} />
            <h2>{data.name}</h2>
            <p>Address: {data.address}</p>
            <p>Phone: {data.phone}</p>
            <p>Website: {data.webSite}</p>
            <p>Type: {data.type}</p>
            {printData.map((data, index) => (
              <div key={index}>
                {data.name}, {data.price}, {data.quantity}, {data.amount}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export const DownloadBill = ({ isWaiter, orders, urlParams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restId = '64c4fdea4055a7111092df34';
  const onClickDownloadAsWaiter = () => {
    setIsModalOpsen(true);
  };

  const onClickDownloadAsCustomer = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <BillInfo
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          orders={orders}
          restId={restId}
        />
      )}
      <Button
        size={'sm'}
        onClick={isWaiter ? onClickDownloadAsWaiter : onClickDownloadAsCustomer}
        className={cls.btn}
      >
        {isWaiter ? 'Download & Print' : 'Download'}
      </Button>
    </>
  );
};

DownloadBill.propTypes = {
  isWaiter: PropTypes.bool,
};
