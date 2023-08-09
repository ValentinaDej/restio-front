import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ component: Element }) => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();

  // Redirect users without a role from admin, cook, and waiter routes
  if (
    (!role || role === 'customer') &&
    (currentPath.includes('/admin') ||
      currentPath.includes('/cook') ||
      currentPath.includes('/waiter'))
  ) {
    return <Navigate to="/" />;
  }

  const allowedRoutes = {
    admin: ['admin'], // Admin can access all routes
    cook: ['cook'], // Cook can access cook routes
    waiter: ['waiter'], // Waiter can access waiter routes
  };

  const currentPath = location.pathname;
  const isNotAllowed =
    role !== 'admin' && !allowedRoutes[role]?.some((route) => currentPath.includes(`/${route}/`));

  if (isNotAllowed) {
    return <Navigate to="/personnel" />;
  }

  return Element;
};
