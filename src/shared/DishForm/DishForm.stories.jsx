import React from 'react';
import { DishForm } from './DishForm';

export default {
  title: 'Forms/DishForm',
  component: DishForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  tags: ['autodocs', 'forms'],
};

const Template = (args) => <DishForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialState: {
    name: 'Salad with tuna',
    type: 'Salad',
    vegetarian: false,
    spicy: false,
    pescatarian: false,
    portionWeigh: 350,
    price: 850,
    ingredients: ['1', '2'],
  },
  buttonText: 'Create',
};
