import { lazy } from 'react';

const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));
const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));

const routesWaiter = [
  { path: 'waiter/tables/:restId', component: <TablesWaiterPage /> },
  { path: 'waiter/tables/:restId/:tableId', component: <TableWaiterPage /> },
  { path: 'waiter/tables/:restId/:tableId/menu', component: <MenuPage /> },
];

export default routesWaiter;
