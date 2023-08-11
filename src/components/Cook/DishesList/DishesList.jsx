import styles from './DishesList.module.scss';
import DishesItem from '../DishesItem/DishesItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const DishesList = ({ dishes, handleChangeStatus }) => {
  return (
    <ul className={`${styles.list}`}>
      {dishes.map(({ dish, quantity, orderId, status, create, tableNumber, orderNumber }) => (
        <DishesItem
          key={nanoid()}
          dish={dish}
          status={status}
          quantity={quantity}
          orderId={orderId}
          create={create}
          handleChangeStatus={handleChangeStatus}
          tableNumber={tableNumber}
          orderNumber={orderNumber}
        />
      ))}
    </ul>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      dish: PropTypes.object.isRequired,
      quantity: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      orderId: PropTypes.string.isRequired,
      create: PropTypes.string.isRequired,
      tableNumber: PropTypes.number.isRequired,
      orderNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default DishesList;
