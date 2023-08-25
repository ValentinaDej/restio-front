import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken, getUserRole } from 'store/auth/authSelector';

export const PrivateRoute = ({ component: Element, redirectTo = '/login' }) => {
  const role = useSelector(getUserRole);
  const token = useSelector(getToken);
  const location = useLocation();
  const currentPath = location.pathname;

  if (
    (!role || role === 'customer') &&
    (currentPath.includes('/admin') ||
      currentPath.includes('/cook') ||
      currentPath.includes('/waiter'))
  ) {
    return <Navigate to="/login" />;
  }
  const allowedRoutes = {
    admin: ['admin'],
    cook: ['cook'],
    waiter: ['waiter'],
  };

  const isNotAllowed =
    role !== 'admin' && !allowedRoutes[role]?.some((route) => currentPath.includes(`/${route}`));

  if (isNotAllowed) {
    return <Navigate to="/login" />;
  }

  const isLoggedIn = token && role;

  return isLoggedIn ? Element : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  redirectTo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  component: PropTypes.element.isRequired,
};
