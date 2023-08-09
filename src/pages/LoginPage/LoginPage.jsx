import LoginForm from 'shared/LoginForm/LoginForm';
import MainWrapper from 'shared/MainWrapper/MainWrapper';
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
