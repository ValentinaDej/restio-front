import React from 'react';
import { Select } from './Select';

export default {
  title: 'Shared/Select',
  component: Select,
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    length: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
};

const Template = (args) => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
);

export const Small = Template.bind({});
Small.args = {
  id: 'select1',
  name: 'select1',
  label: 'Small Select',
  size: 'sm',
  length: 'sm',
};

export const SmallSizeLongLength = Template.bind({});
SmallSizeLongLength.args = {
  id: 'select1',
  name: 'select1',
  label: 'Small Select Long Length',
  size: 'sm',
  length: 'lg',
};

export const Medium = Template.bind({});
Medium.args = {
  id: 'select2',
  name: 'select2',
  label: 'Medium Select',
  size: 'md',
  length: 'md',
};

export const Large = Template.bind({});
Large.args = {
  id: 'select3',
  name: 'select3',
  label: 'Large Select',
  size: 'lg',
  length: 'lg',
};
