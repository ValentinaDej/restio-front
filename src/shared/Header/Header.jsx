import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdRestaurantMenu, MdTableBar } from 'react-icons/md';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { GiCook } from 'react-icons/gi';

import classes from './Header.module.scss';
import Title from 'shared/Title/Title';
import Button from 'shared/Button/Button';
import { callWaiter } from 'api/table';
import { getRestaurantId } from 'store/auth/authSelector';
import { logout } from 'store/auth/authSlice';
import { useQuery } from 'react-query';
import { getRestaurant } from 'api/restaurant';
import { useGetOrdersByTableId } from 'api/order';

const Header = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantId = useSelector(getRestaurantId);

  const { pathname } = useLocation();
  const arrParams = pathname.split('/');

  const restId = arrParams[1];
  const tableId = arrParams[3];

  // const { data: orders } = useGetOrdersByTableId({ restId, tableId });
  // const totalOrders = orders?.data?.orders.length;

  const { isError, isLoading, data } = useQuery(
    ['restaurant', restId],
    async () => await getRestaurant(restId),
    {
      refetchOnWindowFocus: false, // Disable refetching when the window gains focus
      refetchOnReconnect: false, // Disable refetching when the network reconnects
      refetchInterval: false, // Disable automatic periodic refetching
    }
  );

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
        <img src={data?.picture} alt="logo" className={classes.header__img} />
      </div>
      {role !== 'customer' && (
        <div className={classes.header__button}>
          <Title mode="h1" fontSize={26} fontWeight={700} color="var(--color-font)">
            {data?.name}
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
          {/* {totalOrders > 0 && (
            <Button
              size="sm"
              mode="outlined"
              onClick={() => navigate(`/${restId}/tables/${tableId}/orders`)}
            >
              Orders: {totalOrders}
            </Button>
          )} */}
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
