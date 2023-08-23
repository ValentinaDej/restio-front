import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './styles.scss';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import { PrivateRoute, PublicRoute } from 'routes/RoutesComponents';
import RoutesProvider from 'routes/RoutesProvider';
import routesAdmin from 'routes/routesAdmin';
import routesCook from 'routes/routesCook';
import routesWaiter from 'routes/routesWaiter';
import routesCustomer from 'routes/routesCustomer';
import { Loader } from 'shared';

const variantPath = {
  admin: routesAdmin,
  waiter: routesWaiter,
  cook: routesCook,
};

const App = () => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const restId = path[1];

  const { role } = useSelector((state) => state.auth);

  return (
    <>
      <Suspense fallback={<Loader size="lg" />}>
        <Routes>
          <Route path="/" element={<PublicRoute component={<HomePage />} />} />
          <Route path="login" element={<PublicRoute component={<LoginPage />} />} />
          <Route element={<RoutesProvider restId={restId} role={role} />}>
            {routesCustomer.map(({ path, component }) => (
              <Route key={path} path={path} element={<PublicRoute component={component} />} />
            ))}

            {(role === 'admin' || role === 'waiter' || role === 'cook') &&
              variantPath[role].map(({ path, component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<PrivateRoute redirectTo="/login" component={component} />}
                />
              ))}
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>

      <Toaster />
    </>
  );
};

export default App;
