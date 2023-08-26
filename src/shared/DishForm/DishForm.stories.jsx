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
Default.args = {};
