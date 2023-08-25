import { useNavigate } from 'react-router';

import css from './ErrorPage.module.scss';
import burger from 'assets/img/burger.png';
import number from 'assets/img/4.png';
import { Button, Title } from 'shared';
import { useSelector } from 'react-redux';

const ErrorPage = () => {
  const { role, restaurantId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onClickHandler = () => {
    switch (role) {
      case 'admin':
        navigate(`/${restaurantId}/admin/dishes`);
        break;
      case 'waiter':
        navigate(`/${restaurantId}/waiter/tables`);
        break;
      case 'cook':
        navigate(`/${restaurantId}/cook`);
        break;
      default:
        navigate(-1);
    }
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
