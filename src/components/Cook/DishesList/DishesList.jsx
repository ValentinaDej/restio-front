import styles from './DishesList.module.scss';
import DishesItem from '../DishesItem/DishesItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const DishesList = ({ dishes, handleChangeStatus }) => {
  return (
    <ul className={`${styles.list}`}>
      {dishes.map(({ dish, quantity, status, orderId }) => {
        return (
          <DishesItem
            key={nanoid()}
            dish={dish}
            status={status}
            quantity={quantity}
            orderId={orderId}
            handleChangeStatus={handleChangeStatus}
          />
        );
      })}
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
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default DishesList;
