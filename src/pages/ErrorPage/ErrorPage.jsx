import { useNavigate } from 'react-router';

import css from './ErrorPage.module.scss';
import burger from 'assets/img/burger.png';
import number from 'assets/img/4.png';
import { Button, Title } from 'shared';

const ErrorPage = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/');
  };
  return (
    <main className={css.section}>
      <div className={css.container}>
        <div className={css.number}>
          <img src={number} className={css.image} />
        </div>
        <div className={`${css.number} ${css.burger}`}>
          <img src={burger} className={css.image} />
        </div>
        <div className={css.number}>
          <img src={number} className={css.image} />
        </div>
      </div>
      <Title mode="h2" color={'var(--color-blue-dark'}>
        Page not found
      </Title>
      <Button onClick={onClickHandler}>Back to home</Button>
    </main>
  );
};

export default ErrorPage;
