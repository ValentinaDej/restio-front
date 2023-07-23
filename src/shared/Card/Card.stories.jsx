import Card from './Card';

const meta = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    src: {
      type: 'string',
      description: 'Image source url',
    },
    title: {
      type: 'string',
      description: 'Dish title',
    },
    price: {
      type: 'number',
      description: 'Price of the dish',
    },
    quantity: {
      type: 'number',
      description: 'Quantity of items',
    },
    mode: {
      type: 'string',
      defaultValue: 'order',
      options: ['order', 'cart'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;

export const Order = {
  args: {
    mode: 'order',
  },
};

export const Cart = {
  args: {
    mode: 'cart',
  },
};
