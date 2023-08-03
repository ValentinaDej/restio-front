// PrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ component: Element }) => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();
  let isNotAllowed = false;
  let redirectTo = '/personnel';

  if (!role) {
    isNotAllowed = true;
    redirectTo = '/';
  }

  const allowedRoutes = {
    admin: ['admin'], // Admin can access all routes
    cook: ['cook'], // Cook can access cook routes
    waiter: ['waiter'], // Waiter can access waiter routes
  };

  const currentPath = location.pathname;
  isNotAllowed =
    role !== 'admin' && !allowedRoutes[role]?.some((route) => currentPath.includes(`/${route}/`));

  if (isNotAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return Element;
};
