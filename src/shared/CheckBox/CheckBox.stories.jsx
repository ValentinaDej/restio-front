import { CheckBox } from './CheckBox';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {},
};
export const WithLabel = {
  args: {
    label: 'Subscribe to newsletter?',
  },
};
export const CustomSize = {
  args: {
    size: 40,
  },
};
export const Checked = {
  args: {
    checked: true,
  },
};
export const Disabled = {
  args: {
    disabled: true,
  },
};
