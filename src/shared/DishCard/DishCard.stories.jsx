import { DishCard } from './DishCard';
import defaultSrc from '../../assets/img/img-template.jpg';
const defaultValues = {
  src: defaultSrc,
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
  weight: 320,
  price: 7.89,
};
const meta = {
  component: DishCard,

  tags: ['autodocs'],
  argTypes: {
    src: {
      type: 'string',
      description: 'Image source url',
      defaultValue: defaultValues.src,
    },
    title: {
      type: 'string',
      description: 'Dish title',
    },
    ingredients: {
      type: 'array',
      description: 'Array of ingredients for a dish',
    },
    weight: {
      type: 'number',
      description: 'Weight of the dish',
    },
    price: {
      type: 'number',
      description: 'Price of the dish',
    },
    onClick: {
      type: 'function',
      description: 'Function of adding dish to the cart',
    },
  },
};

export default meta;

export const Default = {
  args: {
    ...defaultValues,
  },
};
