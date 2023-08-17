import { lazy } from 'react';

const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableDishesWaiterPage = lazy(() =>
  import('pages/TableDishesWaiterPage/TableDishesWaiterPage')
);
const TablePayWaiterPage = lazy(() => import('pages/TablePayWaiterPage/TablePayWaiterPage'));

const routesWaiter = [
  { path: ':restId/waiter/tables', component: <TablesWaiterPage /> },
  { path: ':restId/waiter/tables/:tableId/pay', component: <TablePayWaiterPage /> },
  { path: ':restId/waiter/tables/:tableId/dishes', component: <TableDishesWaiterPage /> },
];

export default routesWaiter;
