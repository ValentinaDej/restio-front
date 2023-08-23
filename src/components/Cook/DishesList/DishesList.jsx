import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { DishesItem } from '../DishesItem/DishesItem';
import styles from './DishesList.module.scss';

export const DishesList = ({ dishes, handleChangeStatus }) => {
  const sortedDishes = [...dishes].sort((dishA, dishB) => {
    return new Date(dishA.create) - new Date(dishB.create);
  });

  return (
    <ul className={`${styles.list}`}>
      {sortedDishes.map(
        ({ dish, quantity, orderId, status, create, tableNumber, orderNumber, comment }) => (
          <DishesItem
            key={nanoid()}
            dish={dish}
            status={status}
            quantity={quantity}
            orderId={orderId}
            create={create}
            comment={comment}
            handleChangeStatus={handleChangeStatus}
            tableNumber={tableNumber}
            orderNumber={orderNumber}
          />
        )
      )}
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
      comment: PropTypes.string,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};
