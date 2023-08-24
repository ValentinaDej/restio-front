import React from 'react';
import { EmployeeForm } from './EmployeeForm';

export default {
  title: 'Forms/EmployeeForm', // The title of the component in the Storybook sidebar
  component: EmployeeForm, // The component itself
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

const Template = (args) => <EmployeeForm {...args} />;

// Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  // Set the default args for the story here
  initialState: {
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    gender: 'male',
    role: 'waiter',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
    address: '123 Main St',
  },
  buttonText: 'Submit',
};

export const Mid = Template.bind({});
Mid.args = {
  ...Default.args, // We're reusing the args from the Default story above
  size: 'md',
};
