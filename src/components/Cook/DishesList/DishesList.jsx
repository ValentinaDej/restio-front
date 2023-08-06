import styles from './DishesList.module.scss';
import DishesItem from '../DishesItem/DishesItem';
import PropTypes from 'prop-types';

const DishesList = ({ dishes, handleChangeStatus, orderId }) => {
  return (
    <ul className={`${styles.list}`}>
      {dishes.map(({ dish, quantity, status }) => {
        return (
          <DishesItem
            key={dish._id}
            dish={dish}
            quantity={quantity}
            status={status}
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
      status: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default DishesList;
