import React from 'react';
import { Status } from './Status';
import '../../styles.scss';

export default {
  title: 'Shared/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    status: {
      type: 'string',
      description: 'The status of the item',
      options: ['active', 'inactive'],
      control: {
        type: 'radio',
      },
    },
  },
};

const Template = (args) => <Status {...args} />;

export const ActiveStatus = Template.bind({});
ActiveStatus.args = {
  status: 'active',
};

export const InactiveStatus = Template.bind({});
InactiveStatus.args = {
  status: 'inactive',
};

export const Default = Template.bind({});
Default.args = {
  status: 'active',
};
// check
