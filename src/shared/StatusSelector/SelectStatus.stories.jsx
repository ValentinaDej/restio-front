import React from 'react';
import { StatusSelector } from './StatusSelector';
import '../../styles.scss';

export default {
  title: 'Shared/StatusSelector',
  component: StatusSelector,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Select mode options',
      defaultValue: 'tables',
      options: ['tables', 'dishes', 'orders'],
      control: {
        type: 'radio',
      },
    },
  },
};

const Template = (args) => <StatusSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  mode: 'tables',
};
