// import { store } from 'store';
import { LoginForm } from './LoginForm';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Forms/LoginForm',
  component: LoginForm,
  // decorators: [
  //   (Story) => (
  //     <MemoryRouter>
  //       <Provider store={store}>
  //         <Story />
  //       </Provider>
  //     </MemoryRouter>
  //   ),
  // ],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  tags: ['autodocs', 'forms'],
};

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
