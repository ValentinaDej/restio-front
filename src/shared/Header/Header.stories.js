import { Header } from './Header';

const meta = {
  title: 'Shared/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    restaurantName: {
      type: 'string',
      description: 'Restaurant name',
    },
    role: {
      type: 'string',
      description: 'Role of the authorized person',
      options: ['customer', 'waiter', 'cook', 'admin'],
      control: {
        type: 'radio',
      },
    },
    onClick: {
      type: 'function',
      defaultValue: (e) => {
        console.log(e);
      },
      description: 'Any func',
      options: 'func',
      table: { defaultValue: { summary: '() => void' } },
    },
  },
};

export default meta;

export const Default = {
  args: {
    role: 'customer',
    restaurantName: 'Chelentano',
    logo: 'https://i.otzovik.com/objects/b/270000/263904.png',
    table: '23',
  },
};
