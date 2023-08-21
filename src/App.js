import './styles.scss';
import { Toaster } from 'react-hot-toast';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { PrivateRoute, PublicRoute } from 'routes/RoutesComponents';

import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

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
import { SSEProvider } from 'react-hooks-sse';

const variantPath = {
  admin: routesAdmin,
  waiter: routesWaiter,
  cook: routesCook,
};

const App = () => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const restId = path[1];
  const pathName = {
    login: '/login',
    main: '/',
  };
  const { role } = useSelector((state) => state.auth);
  const RoutesProvider = () => {
    return (
      <SSEProvider endpoint={`http://localhost:3001/sse/${restId}`}>
        <Outlet />
      </SSEProvider>
    );
  };

  return (
    <>
      {location.pathname === pathName.login || location.pathname === pathName.main ? (
        ''
      ) : (
        <Header role={role ? role : 'customer'} />
      )}
      <main>
        <Suspense fallback={<Loader size="lg" />}>
          <Routes>
            <Route path="/" element={<PublicRoute component={<HomePage />} />} />
            <Route path="login" element={<PublicRoute component={<LoginPage />} />} />
            <Route element={<RoutesProvider />}>
              {routesCustomer.map(({ path, component }) => (
                <Route key={path} path={path} element={<PublicRoute component={component} />} />
              ))}

              {(role === 'admin' || role === 'waiter' || role === 'cook') &&
                variantPath[role].map(({ path, component }) => (
                  <Route key={path} path={path} element={<PrivateRoute component={component} />} />
                ))}
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
