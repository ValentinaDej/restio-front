import { useForm } from 'react-hook-form';

import { InputValid } from './InputValid';
import { FaMoneyBillAlt } from 'react-icons/fa';

export default {
  title: 'Shared/InputValid',
  component: InputValid,
  tags: ['autodocs'],
};

const Template = (args) => {
  const { register } = useForm();
  return <InputValid {...args} register={register} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your text',
  name: 'inputName',
  type: 'text',
  autoComplete: 'off',
  validationRules: {},
  register: () => {},
  icon: null,
  size: 'sm',
  length: 'sm',
};

export const InputWithIconError = Template.bind({});
InputWithIconError.args = {
  placeholder: 'Enter your text',
  name: 'inputName',
  type: 'text',
  autoComplete: 'off',
  validationRules: {},
  register: () => {},
  error: 'null',
  icon: FaMoneyBillAlt,
  size: 'sm',
  length: 'sm',
};
