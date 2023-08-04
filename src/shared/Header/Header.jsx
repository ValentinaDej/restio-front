import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import Button from 'shared/Button/Button';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Header = ({ logo, restaurantName, role, onClick }) => {
  const { pathname } = useLocation();
  const arrParams = pathname.split('/');
  const tableId = arrParams[arrParams.length - 1];
  const table = tableId ?? 0;

  return (
    <header className={classes.header}>
      <div className="header__container">
        <div className={classes.header__wrapper}>
          <div className={classes.header__column}>
            <div className={classes.header__logo}>
              <img src={logo} alt="logo" className={classes.header__img} />
            </div>
            <Title mode="h1" fontSize={26} fontWeight={700} color="var(--color-font)">
              {restaurantName}
            </Title>
          </div>
          {role === 'customer' && (
            <div className={classes.header__column}>
              <Text>{`table № ${table}`}</Text>
              <div className={classes.header__button}>
                <Button onClick={onClick} size="md">
                  Call waiter
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
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
