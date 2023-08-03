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
  { path: 'admin/:restId', component: <EmployeePage /> },
  { path: 'admin/:restId/dishes', component: <DishesAdminPage /> },
  { path: 'admin/:restId/personnel/new/:personId', component: <AddPersonnelPage /> },
  { path: 'admin/:restId/personnel/new', component: <AddPersonnelPage /> },
  { path: 'admin/:restId/dishes/new/:dishesId', component: <AddDishPage /> },
  { path: 'admin/:restId/dishes/new/', component: <AddDishPage /> },
  { path: 'admin/:restId/tables', component: <TablesWaiterPage /> },
  { path: 'admin/:restId/tables/:tableId', component: <TableWaiterPage /> },
  { path: 'admin/:restId/cook', component: <DishesForCookPage /> },
];

export default routesAdmin;
