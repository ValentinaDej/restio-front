import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { RiFileList3Line } from 'react-icons/ri';

import { useLocation } from 'react-router-dom';

const Header = ({ logo, restaurantName, role, onClick }) => {
  const { pathname } = useLocation();
  const arrParams = pathname.split('/');
  const tableId = arrParams[arrParams.length - 1];
  const table = tableId ?? 0;

  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img src={logo} alt="logo" className={classes.header__img} />
      </div>
      {role !== 'customer' && (
        <Title mode="h1" fontSize={26} fontWeight={700} color="var(--color-font)">
          {restaurantName}
        </Title>
      )}
      {role === 'customer' && (
        <div className={classes.header__wrapper}>
          <div className={classes.header__button}>
            <Button onClick={onClick} size="sm">
              Call waiter
            </Button>
          </div>
          <Link to="" className={classes.header__link}>
            <RiFileList3Line className={classes.header__icon} />
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
