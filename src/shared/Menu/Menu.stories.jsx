import { Menu } from './Menu';

const meta = {
  title: 'Shared/Menu',
  component: Menu,
  argTypes: {
    mode: {
      type: 'string',
      description: 'Container visibility settings',
      defaultValue: 'primary',
      options: ['primary', 'outlined'],
      control: { type: 'radio' },
    },
    title: {
      type: 'string',
      description: 'Title of page',
      defaultValue: 'Menu',
      options: ['Menu', 'Employees'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

const Template = (args) => <Menu {...args} />;

export const Default = Template.bind({});

Default.args = {
  mode: 'primary',
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  mode: 'outlined',
};

export const Title = Template.bind({});
WithBorder.args = {
  title: 'Employees',
};
