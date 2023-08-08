import './styles.scss';
import { Toaster } from 'react-hot-toast';
import HomePage from 'pages/HomePage/HomePage';

import LoginPage from 'pages/LoginPage/LoginPage';
import { PrivateRoute, PublicRoute } from 'routes/RoutesComponents';
import logoImg from './img/RESTio.svg';
import { Route, Routes, useLocation } from 'react-router-dom';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import routesAdmin from 'routes/routesAdmin';
import routesCook from 'routes/routesCook';
import routesWaiter from 'routes/routesWaiter';
import routesCustomer from 'routes/routesCustomer';
import { useSelector } from 'react-redux';
import Footer from 'shared/Footer/Footer';
import Header from 'shared/Header/Header';
import Loader from 'shared/Loader/Loader';
import { Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

const variantPath = {
  admin: routesAdmin,
  waiter: routesWaiter,
  cook: routesCook,
};

const App = () => {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);

  const pathName = {
    login: '/login',
    main: '/',
  };
  //useState де сбережені лого, назва ресторану поки що болванка
  const logo = logoImg;
  const restaurantName = 'Restio';
  //useEffect с запитом - повертає дані лого, назву ресторану
  //restId =`64c4fdea4055a7111092df32`
  return (
    <>
      {location.pathname === pathName.login || location.pathname === pathName.main ? (
        ''
      ) : (
        <Header logo={logo} restaurantName={restaurantName} role={role ? role : 'customer'} />
      )}
      <main>
        <Suspense fallback={<Loader size="lg" />}>
          <Routes>
            <Route path="/" element={<PublicRoute component={<HomePage />} />} />
            <Route path="login" element={<PublicRoute component={<LoginPage />} />} />
            {routesCustomer.map(({ path, component }) => (
              <Route key={path} path={path} element={<PublicRoute component={component} />} />
            ))}

            {(role === 'admin' || role === 'waiter' || role === 'cook') &&
              variantPath[role].map(({ path, component }) => (
                <Route key={path} path={path} element={<PrivateRoute component={component} />} />
              ))}

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>
      {role && <Footer />}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
