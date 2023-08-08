import { useNavigate } from 'react-router';

import burger from '../../assets/burger.png';
import number from '../../assets/4.png';
import css from './ErrorPage.module.scss';
import Button from 'shared/Button/Button';
import Title from 'shared/Title/Title';

const ErrorPage = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/');
  };
  return (
    <section className={css.section}>
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
    </section>
  );
};

export default ErrorPage;
