import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { BiSolidTrash } from 'react-icons/bi';

import css from './Card.module.scss';
import defaultSrc from '../../assets/img-template.jpg';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import { IconButton } from 'shared/IconButton/IconButton';

const Card = ({
  src = defaultSrc,
  title = 'Pork Tenderloin',
  price = 7.8,
  quantity = 2,
  mode,
  value,
  setValue = () => {},
}) => {
  // const [value, setValue] = useState(quantity);
  const sum = (price * quantity).toFixed(2);
  return (
    <div className={css['card']}>
      <div className={css['card__image-container']}>
        <img className={css['card__image']} src={src} alt={title} />
      </div>
      <div className={css['card__wrapper']}>
        <div className={css['card__flex-container']}>
          <h3 className={css['card__title']}>{title}</h3>
          {mode === 'cart' && <IconButton Svg={BiSolidTrash} size={16} />}
        </div>
        <div className={css['card__flex-container']}>
          {mode === 'cart' ? (
            <QuantityButton size="sm" value={value} setValue={setValue} />
          ) : (
            <>
              <IoIosClose className={css['card__icon']} />
              <p className={css['card__quantity']}>{quantity}</p>
            </>
          )}

          <p className={css['card__sum']}>${sum}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
