import Button from 'shared/Button/Button';
import styles from './DishesItem.module.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import Text from 'shared/Text/Text';

const DishesItem = ({ dish, quantity, handleChangeStatus, status, orderId }) => {
  const { restId } = useParams();

  const isTablet = useMediaQuery({
    query: '(max-width: 1200px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const sizeButton = isMobile ? 'sm' : 'md';
  //   const dateInMilliseconds = new Date(create).getTime();
  //   console.log(create);

  return (
    <li className={`${styles.item}`}>
      <div className={`${styles.information}`}>
        <Text fontSize={24}>{dish.name}</Text>
        <div className={`${styles.information__quantity}`}>
          <IoIosClose size={24} />
          <Text fontSize={24}>{quantity}</Text>
        </div>
      </div>

      {status !== 'In progress' && (
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'In progress')}
          mode="primary"
          size={sizeButton}
          className={`${styles.button__purple} ${styles.button}`}
        >
          In progress
        </Button>
      )}
      {status === 'In progress' && (
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'Ready')}
          mode="primary"
          size={sizeButton}
          className={`${styles.button__green} ${styles.button}`}
        >
          Ready
        </Button>
      )}
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
  status: PropTypes.string.isRequired,
};

export default DishesItem;
