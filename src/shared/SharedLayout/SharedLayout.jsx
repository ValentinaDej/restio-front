import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from 'shared/Footer/Footer';
import Header from 'shared/Header/Header';
import Loader from 'shared/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SharedLayout = ({ logo, restaurantName, table = 0 }) => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();
  const allowedRoutes = {
    admin: ['admin'], // Admin can access all routes
    cook: ['cook'], // Cook can access cook routes
    waiter: ['waiter'], // Waiter can access waiter routes
  };

  const currentPath = location.pathname;
  const isNotAllowed =
    role &&
    role !== 'admin' &&
    !allowedRoutes[role]?.some((route) => currentPath.includes(`/${route}/`));

  if (!role) {
    return <Navigate to="/" />;
  }

  if (isNotAllowed) {
    return <Navigate to="/personnel" />;
  }

  return (
    <>
      <Header logo={logo} restaurantName={restaurantName} table={table} role={role} />
      <Suspense fallback={<Loader size="lg" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default SharedLayout;
