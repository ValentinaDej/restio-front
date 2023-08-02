import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/personnel' }) => {
  //потрібно додати логіку після зміни редакс стору
  const shouldRedirect = false;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
