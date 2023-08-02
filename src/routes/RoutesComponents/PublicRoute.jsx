import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  //треба дописати логіку, коли буде зроблен Redux
  const isLoggedIn = true;
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
