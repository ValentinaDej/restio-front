import { EmptyCard } from './EmptyCard';

const meta = {
  title: 'Shared/EmptyCard',
  component: EmptyCard,
  argTypes: {
    text: {
      type: 'string',
      description: 'Choose what is needed to add',
      defaultValue: 'employee',
      options: ['employee', 'dish'],
      control: { type: 'radio' },
    },
    mode: {
      type: 'string',
      description: 'Border style changing',
      defaultValue: 'primary',
      options: ['primary', 'outlined'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

const Template = (args) => <EmptyCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'employee',
};

export const Text = Template.bind({});
Text.args = {
  text: 'dish',
  mode: 'primary',
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  text: 'employee',
  mode: 'outlined',
};
