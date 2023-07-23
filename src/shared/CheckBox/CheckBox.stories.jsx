import { CheckBox } from './CheckBox';

export default {
  title: 'Shared/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: { type: 'boolean', control: 'boolean', description: 'The checked status' },
    disabled: { type: 'boolean', control: 'boolean', description: 'The disable' },
    label: {
      type: 'string',
      control: 'text',
      description: 'The checkbox label',
    },
    size: {
      type: 'number',
      control: 'number',
      description: 'The checkbox size',
      table: { defaultValue: { summary: 20 } },
    },
    onChange: {
      type: 'function',
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
