import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiFileList3Line } from 'react-icons/ri';

const Header = ({ logo, restaurantName, role, onClick }) => {
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
  role: PropTypes.oneOf(['customer', 'waiter', 'cook', 'administrator']),
  onClick: PropTypes.func,
};
