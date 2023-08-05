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

  const currentPath = location.pathname;

  // Redirect users without a role from admin, cook, and waiter routes
  if (
    !role &&
    (currentPath.includes('/admin') ||
      currentPath.includes('/cook') ||
      currentPath.includes('/waiter'))
  ) {
    return <Navigate to="/" />;
  }

  if (
    role &&
    role === 'waiter' &&
    (currentPath.includes('/admin') || currentPath.includes('/cook'))
  ) {
    return <Navigate to="/personnel" />;
  }

  if (
    role &&
    role === 'cook' &&
    (currentPath.includes('/admin') || currentPath.includes('/waiter'))
  ) {
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
