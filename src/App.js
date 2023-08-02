import './styles.scss';
import { Toaster } from 'react-hot-toast';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { PrivateRoute, PublicRoute } from 'routes/RoutesComponents';
import logoImg from './img/RESTio.svg';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import SharedLayout from 'shared/SharedLayout/SharedLayout';
import routesAdmin from 'routes/routesAdmin';
import routesCook from 'routes/routesCook';
import routesWaiter from 'routes/routesWaiter';
import routesCustomer from 'routes/routesCustomer';

const App = () => {
  const role = 'cook';
  //useState де сбережені лого, назва ресторану поки що болванка
  const logo = logoImg;
  const restaurantName = 'Restio';
  //useEffect с запитом - повертає дані лого, назву ресторану

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute component={<HomePage />} />} />
        <Route path="personnel" element={<PublicRoute component={<HomePage />} />} />
        <Route path="login" element={<PublicRoute component={<LoginPage />} />} />
        {routesCustomer.map(({ path, component }) => (
          <Route key={path} path={path} element={<PublicRoute component={component} />} />
        ))}
        {role === 'administrator' && (
          <Route
            path="admin/:restId"
            element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
          >
            {routesAdmin.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}
        {role === 'waiter' && (
          <Route
            path="waiter/tables/:restId"
            element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
          >
            {routesWaiter.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}
        {role === 'cook' && (
          <Route
            path="cook/:restId"
            element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
          >
            {routesCook.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
