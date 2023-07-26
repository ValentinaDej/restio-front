import React from 'react';
import DishForm from './DishForm';

export default {
  title: 'Forms/DishForm', // The title of the component in the Storybook sidebar
  component: DishForm, // The component itself
  argTypes: {
    onSubmit: { action: 'submitted' }, // Actions to allow us to see function calls in the Storybook UI
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
    },
    length: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs', 'forms'], // Tags for filtering in the Storybook sidebar
};

const Template = (args) => <DishForm {...args} />;

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  // Set the default args for the story here
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

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
};

export const Mid = Template.bind({});
Mid.args = {
  ...Default.args,
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'lg',
};
