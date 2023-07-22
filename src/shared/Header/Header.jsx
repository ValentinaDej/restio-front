import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className={classes.header__wrapper}>Header</div>
      </div>
    </header>
  );
};

export default Header;
