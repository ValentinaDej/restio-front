import Button from 'shared/Button/Button';
import Card from 'shared/Card/Card';
import Status from 'shared/Status/Status';
import styles from './DishesItem.module.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const DishesItem = ({ dish, quantity, handleChangeStatus, status, orderId }) => {
  const { restId } = useParams();

  return (
    <li className={`${styles.item}`}>
      <Card mode="cook" src={dish.picture} title={dish.name} quantity={quantity} />
      <div className={`${styles.button__container}`}>
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'In progress')}
          disabled={status === 'In progress'}
          mode="primary"
          size="sm"
          className={`${styles.button__purple}`}
        >
          In progress
        </Button>
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'Ready')}
          mode="primary"
          size="sm"
          disabled={status === 'Ready'}
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
  handleChangeStatus: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default DishesItem;
