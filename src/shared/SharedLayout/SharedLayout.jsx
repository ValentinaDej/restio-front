import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'shared/Footer/Footer';
import Header from 'shared/Header/Header';
import Loader from 'shared/Loader/Loader';

const SharedLayout = ({ logo, restaurantName, table = 0, role }) => {
  return (
    <>
      <Header logo={logo} restaurantName={restaurantName} table={table} role={role} />
      <main>
        <Suspense fallback={<Loader size="lg" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
export default SharedLayout;
