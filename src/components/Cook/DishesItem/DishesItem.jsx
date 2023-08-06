import Button from 'shared/Button/Button';
import Card from 'shared/Card/Card';
import Status from 'shared/Status/Status';
import styles from './DishesItem.module.scss';
import PropTypes from 'prop-types';

const DishesItem = ({ dish, quantity, status, handleChangeStatus, orderId }) => {
  return (
    <li className={`${styles.item}`}>
      <Card mode="cook" src={dish.picture} title={dish.name} quantity={quantity} />
      <Status statusCurrent={status} className={`${styles.status}`} />
      <div className={`${styles.button__container}`}>
        <Button
          onClick={() => handleChangeStatus(dish._id, orderId, 'In progress')}
          mode="primary"
          size="sm"
          className={`${styles.button__purple}`}
        >
          In progress
        </Button>
        <Button
          onClick={() => handleChangeStatus(dish._id, 'Ready')}
          mode="primary"
          size="sm"
          className={`${styles.button__green}`}
        >
          Ready
        </Button>
      </div>
    </li>
  );
};

DishesItem.propTypes = {
  dish: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default DishesItem;
