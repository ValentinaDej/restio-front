import '../../styles.scss';

import { EmployeeCard } from './EmployeeCard';

const meta = {
  title: 'Shared/EmployeeCard',
  component: EmployeeCard,
  argTypes: {
    mode: {
      type: 'string',
      description: 'Border style changing',
      defaultValue: 'primary',
      options: ['primary', 'outlined'],
      control: { type: 'radio' },
    },
    size: {
      type: 'string',
      description: 'Card resizing',
      defaultValue: 'md',
      options: ['sm', 'md'],
      control: { type: 'radio' },
      description: 'Employee`s card size changing',
    },
  },
  tags: ['autodocs'],
};

export default meta;

const Template = (args) => <EmployeeCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  mode: 'primary',
  size: 'md',
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  mode: 'outlined',
  size: 'md',
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  mode: 'primary',
  size: 'sm',
};

export const MediumCard = Template.bind({});
MediumCard.args = {
  mode: 'primary',
  size: 'md',
};
