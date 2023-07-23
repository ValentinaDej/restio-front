import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import Button from 'shared/Button/Button';
import PropTypes from 'prop-types';

const Header = ({ logo, restaurantName, table = 0, role, onClick }) => {
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
  table: PropTypes.number,
  role: PropTypes.oneOf(['customer', 'waiter', 'cook', 'administrator']),
  onClick: PropTypes.func,
};
