import OrderCard from 'shared/OrderCard/OrderCard';
import cls from './OrderList.module.scss';

const mockOrders = [
  {
    _id: '64c2bdc95c1b58e890309962',
    status: 'Open',
    orderItems: [
      {
        dish: {
          _id: '2',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
      {
        dish: {
          _id: '3',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
      {
        dish: {
          _id: '4',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
    ],
    table_id: '64c2bd8981b58e890309963',
    waiter_id: '64c2bd8981b58e890309964',
  },
  {
    _id: '64c2bdc95c1b58e890309961',
    status: 'Paid',
    orderItems: [
      {
        dish: {
          _id: '8',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
      {
        dish: {
          _id: '9',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
      {
        dish: {
          _id: '10',
          name: 'Pizza Margherita',
          ingredients: ['ingredient_id_1', 'ingredient_id_2', 'ingredient_id_3'],
          picture:
            'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
          type: 'main',
          spicy: false,
          vegetarian: true,
          pescatarian: false,
          portionWeight: 300,
          price: 10.99,
          updatedAt: new Date('2023-07-28T12:00:00Z'),
        },
        quantity: 2,
        status: 'Served',
      },
    ],
    table_id: '64c2bd8981b58e890309963',
    waiter_id: '64c2bd8981b58e890309964',
  },
];

export const OrderList = ({ orders = mockOrders }) => {
  return (
    <div>
      <ul className={cls.list}>
        {orders.map((order) => (
          <OrderCard key={order._id} {...order} />
        ))}
      </ul>
    </div>
  );
};
