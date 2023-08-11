import Button from 'shared/Button/Button';
import styles from './DishesItem.module.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import Text from 'shared/Text/Text';
import { MdTableBar } from 'react-icons/md';
import { BiDish } from 'react-icons/bi';
import { useCallback } from 'react';

const DishesItem = ({
  dish,
  quantity,
  handleChangeStatus,
  status,
  orderId,
  tableNumber,
  orderNumber,
  create,
}) => {
  const { restId } = useParams();

  const isTablet = useMediaQuery({
    query: '(max-width: 1200px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const sizeButton = isMobile ? 'sm' : 'md';
  const dateInMilliseconds = new Date(create).getTime();
  console.log(dateInMilliseconds);

  return (
    <li className={`${styles.item}`}>
      <div className={`${styles.information}`}>
        <Text fontSize={24}>{dish.name}</Text>
        <div className={`${styles.information__quantity}`}>
          <IoIosClose size={24} />
          <Text fontSize={24}>{quantity}</Text>
        </div>
        <div className={`${styles.information__data}`}>
          <MdTableBar size={24} color={'#959895'} />
          <span>{tableNumber}</span>
        </div>
        <div className={`${styles.information__data}`}>
          <BiDish size={24} color={'#959895'} />
          <span>{orderNumber}</span>
        </div>
        <div>
          <p>Waiting time: </p>
        </div>
      </div>

      {status !== 'In progress' && (
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'In progress')}
          mode="outlined"
          size={sizeButton}
          className={`${styles.button}`}
        >
          Start cooking
        </Button>
      )}
      {status === 'In progress' && (
        <Button
          onClick={() => handleChangeStatus(restId, orderId, dish._id, 'Ready')}
          mode="outlined"
          size={sizeButton}
          className={`${styles.button}`}
        >
          Done
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
  tableNumber: PropTypes.number.isRequired,
  orderNumber: PropTypes.string.isRequired,
  create: PropTypes.string.isRequired,
};

export default DishesItem;
