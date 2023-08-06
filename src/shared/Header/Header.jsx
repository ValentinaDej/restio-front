import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ImList2 } from 'react-icons/im';

import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import { callWaiter } from 'api/table';
import { toast } from 'react-hot-toast';

const Header = ({ logo, restaurantName, role }) => {
  const { pathname } = useLocation();
  const arrParams = pathname.split('/');
  const restId = arrParams[1];
  const tableId = arrParams[2];
  const onClickHandler = async () => {
    try {
      await callWaiter(tableId, { status: 'Requested', restaurant_id: restId });
      return toast.success('Please wait, the waiter will be there in a few minutes');
    } catch (error) {
      return toast.error('Something went wrong... Please, try again in few minutes');
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img src={logo} alt="logo" className={classes.header__img} />
      </div>
      {role !== 'customer' && (
        <div className={classes.header__button}>
          <Title mode="h1" fontSize={26} fontWeight={700} color="var(--color-font)">
            {restaurantName}
          </Title>
        </div>
      )}
      {role === 'customer' && (
        <div className={classes.header__wrapper}>
          <div className={classes.header__button}>
            <Button onClick={onClickHandler} size="sm">
              Call waiter
            </Button>
          </div>
          <Link to={`/${restId}/${tableId}/orders`} className={classes.header__link}>
            <ImList2 className={classes.header__icon} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  logo: PropTypes.string,
  restaurantName: PropTypes.string,
  role: PropTypes.oneOf(['customer', 'waiter', 'cook', 'admin']),
  onClick: PropTypes.func,
};
