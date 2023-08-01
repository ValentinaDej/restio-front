import './styles.scss';
import { Toaster } from 'react-hot-toast';
import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { PrivateRoute, PublicRoute } from 'services/routes';
import SharedLayout from 'shared/SharedLayout/SharedLayout';
import logoImg from './img/RESTio.svg';
import { Route, Routes } from 'react-router-dom';
import MenuPage from 'pages/MenuPage/MenuPage';
import OrdersCustomerPage from 'pages/OrdersCustomerPage/OrdersCustomerPage';
import DishPage from 'pages/DishPage/DishPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import TablesWaiterPage from 'pages/TablesWaiterPage/TablesWaiterPage';
import TableWaiterPage from 'pages/TableWaiterPage/TableWaiterPage';
import MenuWaiterPage from 'pages/MenuWaiterPage/MenuWaiterPage';
import PrepareBillWaiterPage from 'pages/PrepareBillWaiterPage/PrepareBillWaiterPage';
import DishesForCookPage from 'pages/DishesForCookPage/DishesForCookPage';
import EmployeePage from 'pages/EmployeePage/EmployeePage';
import DishesAdminPage from 'pages/DishesAdminPage/DishesAdminPage';
import AddPersonnelPage from 'pages/AddPersonnelPage/AddPersonnelPage';
import AddDishPage from 'pages/AddDishPage/AddDishPage';

const App = () => {
  const role = 'waiter';
  //useState де сбережені лого, назва ресторану поки що болванка
  const logo = logoImg;
  const restaurantName = 'Restio';
  //useEffect с запитом - повертає дані лого, назву ресторану

  return (
    <Routes>
      <Route path="/" element={<PublicRoute component={<HomePage />} />} />
      <Route path="personnel" element={<PublicRoute component={<HomePage />} />} />
      <Route path="login" element={<PublicRoute component={<LoginPage />} />} />
      <Route
        path="customer/:restId/:tableId"
        element={<SharedLayout role="customer" restaurantName={restaurantName} logo={logo} />}
      >
        <Route index element={<PublicRoute component={<MenuPage />} />} />
        <Route path="orders" element={<PublicRoute component={<OrdersCustomerPage />} />} />
        <Route path="dishes/:dishId" element={<PublicRoute component={<DishPage />} />} />
      </Route>
      {role === 'administrator' && (
        <Route
          path="admin"
          element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
        >
          <Route index element={<PrivateRoute component={<EmployeePage />} />} />
          <Route path="dishesAdmin" element={<PrivateRoute component={<DishesAdminPage />} />} />
          <Route path="addPersonnel" element={<PrivateRoute component={<AddPersonnelPage />} />} />
          <Route path="addDish" element={<PrivateRoute component={<AddDishPage />} />} />
          <Route path="tables" element={<PrivateRoute component={<TablesWaiterPage />} />} />
          <Route
            path="tables/:tableId"
            element={<PrivateRoute component={<TableWaiterPage />} />}
          />
          <Route
            path="tables/:tableId/menuWaiter"
            element={<PrivateRoute component={<MenuWaiterPage />} />}
          />
          <Route
            path="tables/:tableId/prepareBill"
            element={<PrivateRoute component={<PrepareBillWaiterPage />} />}
          />
          <Route path="cook" element={<PrivateRoute component={<DishesForCookPage />} />} />
        </Route>
      )}
      {role === 'waiter' && (
        <Route
          path="waiter/tables"
          element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
        >
          <Route index element={<PrivateRoute component={<TablesWaiterPage />} />} />
          <Route path=":tableId" element={<PrivateRoute component={<TableWaiterPage />} />} />
          <Route
            path=":tableId/menuWaiter"
            element={<PrivateRoute component={<MenuWaiterPage />} />}
          />
          <Route
            path=":tableId/prepareBill"
            element={<PrivateRoute component={<PrepareBillWaiterPage />} />}
          />
        </Route>
      )}
      {role === 'cook' && (
        <Route
          path="cook"
          element={<SharedLayout role={role} restaurantName={restaurantName} logo={logo} />}
        >
          <Route path="dishes" element={<PrivateRoute component={<DishesForCookPage />} />} />
        </Route>
      )}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
