import { CheckBox } from './CheckBox';
import '../../styles.scss';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'The ckecked status' },
    disabled: { control: 'boolean', description: 'The disable' },
    label: {
      control: 'text',
      description: 'The checkbox label',
    },
    size: {
      control: 'number',
      description: 'The checkbox size',
      table: { defaultValue: { summary: 20 } },
    },
    onChange: {
      defaultValue: (checked) => {
        console.log(checked);
      },
      description: 'Any func',
      options: 'func',
      table: { defaultValue: { summary: '() => void' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A checkbox component that allows the user to select or deselect an option.',
      },
    },
  },
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Subscribe to newsletter?',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  size: 40,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
