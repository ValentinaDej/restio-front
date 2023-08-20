import React from 'react';
import { Calendar } from './Calendar';
import '../../styles.scss';
export default {
  title: 'Shared/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: () => {},
};
