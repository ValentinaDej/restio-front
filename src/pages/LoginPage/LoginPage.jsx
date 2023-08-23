import { MainWrapper, LoginForm } from 'shared';

import classes from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <MainWrapper classname={`${classes.bg}`}>
      <LoginForm />
    </MainWrapper>
  );
};

export default LoginPage;
