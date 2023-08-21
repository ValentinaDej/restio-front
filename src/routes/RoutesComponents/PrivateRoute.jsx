import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUserRole } from 'store/auth/authSelector';

export const PrivateRoute = ({ component: Element, redirectTo = '/login' }) => {
  const role = useSelector(getUserRole);
  const token = useSelector(getToken);
  const location = useLocation();
  const currentPath = location.pathname;

  // Redirect users without a role from admin, cook, and waiter routes
  if (
    (!role || role === 'customer') &&
    (currentPath.includes('/admin') ||
      currentPath.includes('/cook') ||
      currentPath.includes('/waiter'))
  ) {
    return <Navigate to="/login" />;
  }

  const allowedRoutes = {
    admin: ['admin'], // Admin can access all routes
    cook: ['cook'], // Cook can access cook routes
    waiter: ['waiter'], // Waiter can access waiter routes
  };

  const isNotAllowed =
    role !== 'admin' && !allowedRoutes[role]?.some((route) => currentPath.includes(`/${route}`));

  if (isNotAllowed) {
    return <Navigate to="/login" />;
  }

  const isLoggedIn = role && token;
  console.log(isLoggedIn);

  return isLoggedIn ? Element : <Navigate to={redirectTo} />;
};
