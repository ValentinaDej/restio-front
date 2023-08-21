import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

import classes from './BillInfo.module.scss';
import { Modal, Loader, Title, Text, Button } from 'shared';
import logoImg from 'assets/img/RESTio.svg';
import { formatNumberWithTwoDecimalsForPrint } from 'helpers/formatNumberWithTwoDecimalsForPrint';
import { getDate } from 'helpers/getDate';
import { downloadBillPdf } from 'helpers/billToPDF';
import { getRestaurant } from 'api/restaurant';

export const BillInfo = ({ setIsModalOpen, isModalOpen, orders, restId }) => {
  const {
    data: restData,
    isLoading,
    isError,
  } = useQuery(['restaurant', restId], async () => {
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
  const dishData = getOrderData();

  return (
    <div>
      {!isError && (
        <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
          <div>
            <div className={classes.section__wrapper}>
              <img src={restData.picture} alt={restData.name} className={classes.img__wrapper} />
            </div>
            <div className={classes.section__wrapper}>
              <Title textAlign={'center'} fontSize={12}>
                {restData.name}
              </Title>
            </div>
            <div className={classes.section__wrapper}>
              <Text textAlign={'right'} fontSize={10}>
                Address: {restData.address}
              </Text>
              <Text textAlign={'right'} fontSize={10}>
                Phone: {restData.phone}
              </Text>
              <Text textAlign={'right'} fontSize={10}>
                Website: {restData.website}
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
                  {dishData.map((item, index) => (
                    <tr key={index}>
                      <td className={classes.description}>{item.name}</td>
                      <td className={classes.qty}>{item.quantity}</td>
                      <td className={classes.price}>
                        {formatNumberWithTwoDecimalsForPrint(item.price)}
                      </td>
                      <td className={classes.total}>
                        {formatNumberWithTwoDecimalsForPrint(item.quantity * item.price)}
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
                        formatNumberWithTwoDecimalsForPrint(
                          dishData.reduce((total, item) => total + item.quantity * item.price, 0)
                        )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className={classes.section__wrapper}>
              <Text textAlign={'right'} fontSize={10}>
                {getDate(new Date())}
              </Text>
            </div>

            <div className={classes.section__wrapper}>
              <div className={classes.foot__wrapper}>
                <div>
                  <Text textAlign={'center'} fontSize={10}>
                    Have a nice day
                  </Text>
                </div>
                <img src={logoImg} alt="RESTio" className={classes.logo} />
              </div>
              <div className={classes.foot__wrapper}>
                <Button
                  onClick={() => downloadBillPdf(restData, dishData)}
                  size={'sm'}
                  mode="outlined"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
