import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { MdRestaurantMenu, MdTableBar } from 'react-icons/md';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { GiCook } from 'react-icons/gi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import classes from './Header.module.scss';
import { ReactComponent as Bell } from 'assets/icons/desk-bell.svg';

import { Sidebar, OrdersButton } from 'components';
import { callWaiter } from 'api/table';
import { getRestaurant } from 'api/restaurant';
import { getRestaurantId } from 'store/auth/authSelector';
import { logout } from 'store/auth/authSlice';
import { Button } from 'shared';

export const Header = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurantId = useSelector(getRestaurantId);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const arrParams = pathname.split('/');
  const restId = arrParams[1];
  const tableId = arrParams[3];

  const isMobile = useMediaQuery({
    query: '(max-width: 767.98px)',
  });
  const { data } = useQuery(['restaurant', restId], async () => await getRestaurant(restId), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = () => {
    navigate('login', { replace: true });
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
      {role === 'customer' ? (
        <Link to={`/${restId}/tables/${tableId}`} className={classes.header__logo}>
          <img src={data?.picture} alt="logo" className={classes.header__img} />
        </Link>
      ) : (
        <div className={classes.header__logo}>
          <img src={data?.picture} alt="logo" className={classes.header__img} />
        </div>
      )}

      {role !== 'customer' && (
        <div className={classes.header__button}>
          <h1 className={classes.header__title}>{data?.name}</h1>
        </div>
      )}
      {role === 'waiter' && <Sidebar />}
      {role === 'admin' && (
        <>
          {isMobile ? (
            <>
              {isOpen && (
                <div className={classes['mobile-menu']}>
                  <NavLink className={classes.header__link} to={`${restaurantId}/admin/dishes`}>
                    <MdRestaurantMenu className={classes.header__icon} />
                  </NavLink>
                  <NavLink className={classes.header__link} to={`${restaurantId}/admin/personnel`}>
                    <IoPeopleSharp className={classes.header__icon} />
                  </NavLink>
                  <NavLink className={classes.header__link} to={`${restaurantId}/waiter/tables`}>
                    <MdTableBar className={classes.header__icon} />
                  </NavLink>
                  <NavLink className={classes.header__link} to={`${restaurantId}/cook`}>
                    <GiCook className={classes.header__icon} />
                  </NavLink>
                  <NavLink className={classes.header__link} to={`${restaurantId}/admin/statistics`}>
                    <FaMoneyBillTrendUp className={classes.header__icon} />
                  </NavLink>
                  <button className={classes.header__link} onClick={logoutHandler}>
                    <FiLogOut className={classes.header__icon} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={classes.header__wrapper}>
              <NavLink className={classes.header__link} to={`${restaurantId}/admin/dishes`}>
                <MdRestaurantMenu className={classes.header__icon} />
              </NavLink>
              <NavLink className={classes.header__link} to={`${restaurantId}/admin/personnel`}>
                <IoPeopleSharp className={classes.header__icon} />
              </NavLink>
              <NavLink className={classes.header__link} to={`${restaurantId}/waiter/tables`}>
                <MdTableBar className={classes.header__icon} />
              </NavLink>
              <NavLink className={classes.header__link} to={`${restaurantId}/cook`}>
                <GiCook className={classes.header__icon} />
              </NavLink>
              <NavLink className={classes.header__link} to={`${restaurantId}/admin/statistics`}>
                <FaMoneyBillTrendUp className={classes.header__icon} />
              </NavLink>
            </div>
          )}
          <Sidebar />
        </>
      )}
      {role !== 'customer' && (
        <>
          {isMobile && role === 'admin' ? (
            <button
              className={`${classes['switch-button']} ${isOpen ? classes.open : ''}`}
              onClick={toggleMenuHandler}
            >
              {isOpen ? (
                <AiOutlineClose className={classes.header__icon} />
              ) : (
                <AiOutlineMenu className={classes.header__icon} />
              )}
            </button>
          ) : (
            <div className={classes.header__wrapper}>
              <button className={classes.header__link} onClick={logoutHandler}>
                <FiLogOut className={classes.header__icon} />
              </button>
            </div>
          )}
        </>
      )}
      {role === 'customer' && (
        <div className={classes.header__wrapper}>
          <Button size="sm" onClick={onClickHandler}>
            Call a waiter
          </Button>
          <OrdersButton restId={restId} tableId={tableId} />
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  role: PropTypes.oneOf(['customer', 'waiter', 'cook', 'admin']),
};
