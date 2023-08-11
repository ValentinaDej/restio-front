import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdRestaurantMenu, MdTableBar } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { GiCook } from 'react-icons/gi';

import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import { callWaiter } from 'api/table';
import { getRestaurantId } from 'store/auth/authSelector';
import { logout } from 'store/auth/authSlice';

const Header = ({ logo, restaurantName, role }) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector(getRestaurantId);

  const { pathname } = useLocation();
  const arrParams = pathname.split('/');
  const restId = arrParams[1];
  const tableId = arrParams[2];
  const logoutHandler = () => {
    dispatch(logout());
  };

  const onClickHandler = async () => {
    try {
      await callWaiter(tableId, { status: 'Waiting', restaurant_id: restId });
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
      {role === 'admin' && (
        <div className={classes.header__wrapper}>
          <NavLink className={classes.header__link} to={`${restaurantId}/admin/dishes`}>
            <MdRestaurantMenu className={classes.header__icon} />
          </NavLink>
          <NavLink className={classes.header__link} to={`${restaurantId}/admin/personnel`}>
            <IoPeopleSharp className={classes.header__icon} />
          </NavLink>
          <NavLink className={classes.header__link} to={`${restaurantId}/admin/tables`}>
            <MdTableBar className={classes.header__icon} />
          </NavLink>
          <NavLink className={classes.header__link} to={`${restaurantId}/admin/cook`}>
            <GiCook className={classes.header__icon} />
          </NavLink>
        </div>
      )}
      {role !== 'customer' && (
        <div className={classes.header__wrapper}>
          <button className={classes.header__link} onClick={logoutHandler}>
            <FiLogOut className={classes.header__icon} />
          </button>
        </div>
      )}
      {role === 'customer' && (
        <div className={classes.header__wrapper}>
          <div className={classes.header__button}>
            <Button onClick={onClickHandler} size="sm">
              Call waiter
            </Button>
          </div>
          <NavLink to={`/${restId}/${tableId}/orders`} className={classes['header__link-button']}>
            Orders
          </NavLink>
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
