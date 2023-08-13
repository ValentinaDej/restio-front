import { lazy } from 'react';

const EmployeePage = lazy(() => import('pages/EmployeePage/EmployeePage'));
const DishesAdminPage = lazy(() => import('pages/DishesAdminPage/DishesAdminPage'));
const AddPersonnelPage = lazy(() => import('pages/AddPersonnelPage/AddPersonnelPage'));
const AddDishPage = lazy(() => import('pages/AddDishPage/AddDishPage'));
// const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
// const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));
// const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));

const routesAdmin = [
  { path: ':restId/personnel', component: <EmployeePage /> },
  { path: ':restId/dishes', component: <DishesAdminPage /> },
  { path: ':restId/personnel/edit/:personId', component: <AddPersonnelPage /> },
  { path: ':restId/personnel/new', component: <AddPersonnelPage /> },
  { path: ':restId/dishes/edit/:dishesId', component: <AddDishPage /> },
  { path: ':restId/dishes/new/', component: <AddDishPage /> },
  // { path: ':restId/tables', component: <TablesWaiterPage /> },
  // { path: ':restId/tables/:tableId', component: <TableWaiterPage /> },
  // { path: ':restId/cook', component: <DishesForCookPage /> },
];

export default routesAdmin;
