import { useState } from 'react';
import { useQuery } from 'react-query';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

import { LiaDownloadSolid } from 'react-icons/lia';

import Button from 'shared/Button/Button';
import Modal from 'shared/Modal/Modal';
import Loader from 'shared/Loader/Loader';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import logoImg from 'img/RESTio.svg';

import { formatNumberWithTwoDecimals } from 'helpers/formatNumberWithTwoDecimals';
import { formatDateTime } from 'helpers/formatDateTime';
import { getRestaurant } from 'api/restaurant';

import classes from './DownloadBill.module.scss';

const BillInfo = ({ setIsModalOpen, isModalOpen, orders, restId }) => {
  const { data, isLoading, isError } = useQuery(['restaurant', restId], async () => {
    const result = await getRestaurant(restId);
    return result;
  });

  if (isLoading) {
    return <Loader size="lg" />;
  }

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
            <div className={classes.section__wrapper}>
              <div className={classes.head__wrapper}>
                <Text textAlign={'center'} fontSize={'0.6rem'} fontWeight={600}>
                  table #
                </Text>
                <LiaDownloadSolid onClick={downloadBillPdf} className={classes.icon} />
              </div>
            </div>
            <div className={classes.section__wrapper}>
              <img src={data.picture} alt={data.name} className={classes.img__wrapper} />
            </div>
            <div className={classes.section__wrapper}>
              <Title textAlign={'center'} fontSize={'1rem'}>
                {data.name}
              </Title>
            </div>
            <div className={classes.section__wrapper}>
              <Text textAlign={'right'} fontSize={'0.6rem'}>
                Address: {data.address}
              </Text>
              <Text textAlign={'right'} fontSize={'0.6rem'}>
                Phone: {data.phone}
              </Text>
              <Text textAlign={'right'} fontSize={'0.6rem'}>
                Website: {data.website}
              </Text>
            </div>
            <div className={classes.section__wrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th className={classes.description}>Description</th>
                    <th className={classes.qty}>Qty</th>
                    <th className={classes.price}>Price</th>
                    <th className={classes.total}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {printData.map((item, index) => (
                    <tr key={index}>
                      <td className={classes.description}>{item.name}</td>
                      <td className={classes.qty}>{item.quantity}</td>
                      <td className={classes.price}>{formatNumberWithTwoDecimals(item.price)}</td>
                      <td className={classes.total}>
                        {formatNumberWithTwoDecimals(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className={classes.totalLabel}>
                      Total
                    </td>
                    <td colSpan="2" className={classes.totalAmount}>
                      $
                      {' ' +
                        formatNumberWithTwoDecimals(
                          printData.reduce((total, item) => total + item.quantity * item.price, 0)
                        )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={classes.section__wrapper}>
              <Text textAlign={'right'} fontSize={'0.6rem'}>
                {formatDateTime(new Date())}
              </Text>
            </div>

            <div className={classes.section__wrapper}>
              <div className={classes.foot__wrapper}>
                <div>
                  <Text textAlign={'center'} fontSize={'0.6rem'}>
                    Have a nice day
                  </Text>
                </div>
                <img src={logoImg} alt="RESTio" className={classes.logo} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export const DownloadBill = ({ isWaiter, orders, urlParams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { restId } = urlParams;

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
      <Button size={'sm'} onClick={isWaiter ? onClickDownloadAsWaiter : onClickDownloadAsCustomer}>
        {isWaiter ? 'Download & Print' : 'Download'}
      </Button>
    </>
  );
};

DownloadBill.propTypes = {
  isWaiter: PropTypes.bool,
};
