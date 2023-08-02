import { lazy } from 'react';

const EmployeePage = lazy(() => import('pages/EmployeePage/EmployeePage'));
const DishesAdminPage = lazy(() => import('pages/DishesAdminPage/DishesAdminPage'));
const AddPersonnelPage = lazy(() => import('pages/AddPersonnelPage/AddPersonnelPage'));
const AddDishPage = lazy(() => import('pages/AddDishPage/AddDishPage'));
const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));
const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));

const routesAdmin = [
  { path: '', component: <EmployeePage /> },
  { path: 'dishes', component: <DishesAdminPage /> },
  { path: 'personnel/new/:personId', component: <AddPersonnelPage /> },
  { path: 'personnel/new', component: <AddPersonnelPage /> },
  { path: 'dishes/new/:dishesId', component: <AddDishPage /> },
  { path: 'dishes/new/', component: <AddDishPage /> },
  { path: 'tables', component: <TablesWaiterPage /> },
  { path: 'tables/:tableId', component: <TableWaiterPage /> },
  { path: 'tables/:tableId/menu', component: <MenuPage /> },
  { path: 'cook', component: <DishesForCookPage /> },
];

export default routesAdmin;
