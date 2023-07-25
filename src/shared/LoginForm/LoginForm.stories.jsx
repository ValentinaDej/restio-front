import LoginForm from './LoginForm';

const meta = {
  title: 'Shared/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
};

export default meta;

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
