import { MdOutlineAddCircle } from 'react-icons/md';

import css from './DishCard.module.scss';
import defaultSrc from '../../assets/img-template.jpg';
import Title from 'shared/Title/Title';

const defaultValues = {
  alt: 'alt',
  title: 'Pork Tenderloin',
  ingredients: [
    'Pork',
    'Garlic',
    'Oil',
    'White wine',
    'Shallot',
    'Pork',
    'Garlic',
    'Oil',
    'White wine',
    'Shallot',
  ],
  weight: '320g',
  price: 7.49,
};

const DishCard = ({
  src = defaultSrc,
  alt = defaultValues.alt,
  title = defaultValues.title,
  ingredients = defaultValues.ingredients,
  weight = defaultValues.weight,
  price = defaultValues.price,
  onClick,
}) => {
  return (
    <div className={css['card-container']}>
      <div className={css['card-container__image-wrapper']}>
        <img className={css['card-container__image']} src={src} alt={alt} />
      </div>
      <Title color="#303c6c" fontSize={20} fontWeight={600}>
        {`${title} (${weight})`}
      </Title>
      <p className={css['card-container__ingredients']}>{ingredients.join(', ')}</p>
      <div className={css['card-container__wrapper']}>
        <p className={css['card-container__price']}>${price}</p>
        <button type="button" onClick={onClick}>
          <MdOutlineAddCircle className={css['card-container__icon']} />
        </button>
      </div>
    </div>
  );
};

export default DishCard;
