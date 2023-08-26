import { OrderCard } from './OrderCard';

const meta = {
  title: 'Shared/OrderCard',
  component: OrderCard,
  tags: ['autodocs'],
  argTypes: {
    _id: {
      type: 'string',
      description: 'Order _id',
    },
    orderItems: {
      type: 'array',
      description: 'Order items',
    },
    status: {
      type: 'string',
      control: 'text',
      description: 'The status of the order',
    },
  },
};

export default meta;

const orderItem = {
  dish: {
    name: 'Pizza Margherita',
    ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
    picture:
      'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
    type: 'main',
    spicy: false,
    vegetarian: true,
    pescatarian: false,
    portionWeight: 300, // grams
    price: 10.99, // USD
    updatedAt: new Date('2023-07-28T12:00:00Z'),
  },
  quantity: 2,
  status: 'Served',
};

export const Small = {
  args: {
    _id: '2',
    orderItems: [orderItem, orderItem, orderItem, orderItem, orderItem, orderItem, orderItem],
    status: 'Open',
    small: true,
  },
};

export const Success = {
  args: {
    _id: '2',
    orderItems: [orderItem, orderItem, orderItem, orderItem, orderItem, orderItem, orderItem],
    status: 'Paid',
    isWaiter: true,
    created_at: new Date('2023-07-28T12:00:00Z'),
  },
};
