import styles from './DishesList.module.scss';
import DishesItem from '../DishesItem/DishesItem';
import PropTypes from 'prop-types';

const DishesList = ({ dishes, handleChangeStatus, orderId }) => {
  return (
    <ul className={`${styles.list}`}>
      {dishes.map(({ dish, quantity }) => {
        return (
          <DishesItem
            key={dish._id}
            dish={dish}
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
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default DishesList;
