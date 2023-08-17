import { lazy } from 'react';

const EmployeePage = lazy(() => import('pages/EmployeePage/EmployeePage'));
const DishesAdminPage = lazy(() => import('pages/DishesAdminPage/DishesAdminPage'));
const AddPersonnelPage = lazy(() => import('pages/AddPersonnelPage/AddPersonnelPage'));
const AddDishPage = lazy(() => import('pages/AddDishPage/AddDishPage'));
const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableDishesWaiterPage = lazy(() =>
  import('pages/TableDishesWaiterPage/TableDishesWaiterPage')
);
const TablePayWaiterPage = lazy(() => import('pages/TablePayWaiterPage/TablePayWaiterPage'));
const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));
const StatisticsPage = lazy(() => import('pages/StatisticsPage/StatisticsPage'));

const routesAdmin = [
  { path: ':restId/admin/personnel', component: <EmployeePage /> },
  { path: ':restId/admin/dishes', component: <DishesAdminPage /> },
  { path: ':restId/admin/personnel/edit/:personId', component: <AddPersonnelPage /> },
  { path: ':restId/admin/personnel/new', component: <AddPersonnelPage /> },
  { path: ':restId/admin/dishes/edit/:dishesId', component: <AddDishPage /> },
  { path: ':restId/admin/dishes/new/', component: <AddDishPage /> },
  { path: ':restId/admin/statistics', component: <StatisticsPage /> },
  { path: ':restId/waiter/tables', component: <TablesWaiterPage /> },
  { path: ':restId/waiter/tables/:tableId/pay', component: <TablePayWaiterPage /> },
  { path: ':restId/waiter/tables/:tableId/dishes', component: <TableDishesWaiterPage /> },
  { path: ':restId/cook', component: <DishesForCookPage /> },
];

export default routesAdmin;
