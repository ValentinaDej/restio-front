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
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const AdminPage = () => <div>Admin Page</div>;
const WaiterPage = () => <div>Waiter Page</div>;
const CookPage = () => <div>Cook Page</div>;

const queryClient = new QueryClient();

const App = () => {
  const { role } = useSelector((state) => state.auth);
  //useState де сбережені лого, назва ресторану поки що болванка
  const logo = logoImg;
  const restaurantName = 'Restio';
  //useEffect с запитом - повертає дані лого, назву ресторану
  //restId =`64c4fdea4055a7111092df32`
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/" element={<PublicRoute component={<HomePage />} />} />
        <Route path="personnel" element={<PublicRoute component={<HomePage />} />} />
        <Route path="login" element={<PublicRoute component={<LoginPage />} />} />

        {/* Routes for customers (no role) */}
        <Route
          path=":restId/:tableId"
          element={<SharedLayout restaurantName={restaurantName} logo={logo} />}
        >
          {routesCustomer.map(({ path, component }) => (
            <Route key={path} path={path} element={<PublicRoute component={component} />} />
          ))}
        </Route>

        {/* Routes for admin */}
        {role === 'admin' && (
          <Route
            path="admin/:restId"
            element={<SharedLayout restaurantName={restaurantName} logo={logo} />}
          >
            {routesAdmin.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}

        {/* Routes for waiter */}
        {role === 'waiter' && (
          <Route
            path="waiter/tables/:restId"
            element={<SharedLayout restaurantName={restaurantName} logo={logo} />}
          >
            {routesWaiter.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}

        {/* Routes for cook */}
        {role === 'cook' && (
          <Route
            path="cook/:restId"
            element={<SharedLayout restaurantName={restaurantName} logo={logo} />}
          >
            {routesCook.map(({ path, component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={component} />} />
            ))}
          </Route>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
