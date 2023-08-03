import './styles.scss';
import { Toaster } from 'react-hot-toast';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { PrivateRoute, PublicRoute } from 'routes/RoutesComponents';
import logoImg from './img/RESTio.svg';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import routesAdmin from 'routes/routesAdmin';
import routesCook from 'routes/routesCook';
import routesWaiter from 'routes/routesWaiter';
import routesCustomer from 'routes/routesCustomer';
import { useSelector } from 'react-redux';
import Footer from 'shared/Footer/Footer';
import Header from 'shared/Header/Header';

const variantPath = {
  admin: routesAdmin,
  waiter: routesWaiter,
  cook: routesCook,
};

const App = () => {
  //   const { role } = useSelector((state) => state.auth);
  const role = 'customer';
  //useState де сбережені лого, назва ресторану поки що болванка
  const logo = logoImg;
  const restaurantName = 'Restio';
  //useEffect с запитом - повертає дані лого, назву ресторану
  //restId =`64c4fdea4055a7111092df32`
  return (
    <>
      {role && <Header logo={logo} restaurantName={restaurantName} role={role} />}
      <main>
        <Routes>
          <Route path="/" element={<PublicRoute component={<HomePage />} />} />
          <Route path="personnel" element={<PublicRoute component={<HomePage />} />} />
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
      </main>
      {role && <Footer />}
      <Toaster />
    </>
  );
};

export default App;
