import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { MdTableBar } from 'react-icons/md';
import { BiDish } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';

import styles from './DishesItem.module.scss';
import { Text, Button } from 'shared';
import { useEffect, useState } from 'react';

export const DishesItem = ({
  dish,
  quantity,
  handleChangeStatus,
  status,
  orderId,
  tableNumber,
  orderNumber,
  create,
  comment,
}) => {
  const { restId } = useParams();
  const dateInMilliseconds = new Date(create).getTime();
  const [timeForWaiting, setTimeForWaiting] = useState(
    Math.round((Date.now() - dateInMilliseconds) / 60000)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeForWaiting = Math.round((Date.now() - dateInMilliseconds) / 60000);
      setTimeForWaiting(newTimeForWaiting);
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  });

  const isMobile = useMediaQuery({
    query: '(max-width: 767.98px)',
  });

  const sizeButton = isMobile ? 'md' : 'lg';

  return (
    <li className={`${styles.item}`}>
      <div className={`${styles.information}`}>
        <Text classname={`${styles.information__text}`}>{dish.name}</Text>

        <div className={`${styles.information__quantity}`}>
          <IoIosClose size={24} />
          <Text classname={`${styles.information__text}`}>{quantity}</Text>
        </div>
        <div className={`${styles.information__timeSection}`}>
          <p className={`${styles.information__timeText}`}>Waiting:</p>
          <div
            className={`${styles.information__time} ${timeForWaiting > 10 ? styles.active : ''}`}
          >
            <p className={`${styles.information__timeText}`}>{timeForWaiting}</p>
            <p className={`${styles.information__timeText}`}> min</p>
          </div>
        </div>
      </div>

      <div className={`${styles.comment}`}>{comment && <p>{comment}</p>}</div>
      <div>
        <div className={`${styles.information__order}`}>
          <div className={`${styles.information__data}`}>
            <MdTableBar size={24} color={'#959895'} />
            <span>{tableNumber}</span>
          </div>
          <div className={`${styles.information__data}`}>
            <BiDish size={24} color={'#959895'} />
            <span>{orderNumber}</span>
          </div>
        </div>

        {status !== 'In progress' && (
          <Button
            onClick={() => handleChangeStatus(restId, orderId, dish._id, 'In progress', dish.name)}
            mode="outlined"
            size={sizeButton}
            className={`${styles.button}`}
          >
            {status === 'Ordered' ? 'Start cooking' : 'Return to сooking'}
          </Button>
        )}
        {status === 'In progress' && (
          <Button
            onClick={() => handleChangeStatus(restId, orderId, dish._id, 'Ready', dish.name)}
            mode="outlined"
            size={sizeButton}
            className={`${styles.button}`}
          >
            Dish ready
          </Button>
        )}
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
  status: PropTypes.string.isRequired,
  tableNumber: PropTypes.number.isRequired,
  orderNumber: PropTypes.string.isRequired,
  create: PropTypes.string.isRequired,
  comment: PropTypes.string,
};
