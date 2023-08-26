import { Card } from './Card';
import defaultSrc from 'assets/img/img-template.jpg';

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
    addOne: {
      type: 'function',
      description: 'Add quantity button value',
    },
    minusOne: {
      type: 'function',
      description: 'Minus quantity button value',
    },
    onDelete: {
      type: 'function',
      description: 'Handle deleting dish from the cart',
    },
    onClick: {
      type: 'function',
      description: 'Handle adding dish to the order by waiter',
    },
    mode: {
      type: 'string',
      defaultValue: 'order',
      options: ['order', 'cart', 'waiter', 'cook'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;

const defaultValues = {
  src: defaultSrc,
  title: 'Pork Tenderloin',
  quantity: 1,
};

export const Order = {
  args: {
    ...defaultValues,
    price: 7.8,
    mode: 'order',
  },
};

export const Cart = {
  args: {
    ...defaultValues,
    price: 7.8,
    mode: 'cart',
    addOne: () => {},
    minusOne: () => {},
    onDelete: () => {},
  },
};

export const Waiter = {
  args: {
    ...defaultValues,
    mode: 'waiter',
    addOne: () => {},
    minusOne: () => {},
    onClick: () => {},
  },
};

export const Cook = {
  args: {
    ...defaultValues,
    mode: 'cook',
  },
};
