import { QuantityButton } from './QuantityButton';

const meta = {
  title: 'Shared/QuantityButton',
  component: QuantityButton,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Quantity button appearance options',
      defaultValue: 'default',
      options: ['default', 'outlined'],
    },
    size: {
      type: 'string',
      description: 'Quantity button size options',
      defaultValue: 'md',
      options: ['sm', 'md'],
    },
    addOne: {
      type: 'function',
      description: 'Function to handle value changes',
    },
    minusOne: {
      type: 'function',
      description: 'Function to handle value changes',
    },
    quantity: {
      control: {
        type: 'number',
        min: 1,
        max: 99,
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    mode: 'default',
    size: 'md',
  },
};

export const Outlined = {
  args: {
    ...Default.args,
    mode: 'outlined',
  },
};

export const Small = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};
