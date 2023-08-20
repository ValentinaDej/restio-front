import { MainWrapper, LoginForm } from 'shared';
import classes from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <main>
      <MainWrapper classname={`${classes.bg}`}>
        <LoginForm />
      </MainWrapper>
    </main>
  );
};

export default LoginPage;
