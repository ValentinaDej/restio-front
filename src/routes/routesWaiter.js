import { lazy } from 'react';

const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));

const routesWaiter = [
  { path: ':restId/waiter/tables', component: <TablesWaiterPage /> },
  { path: ':restId/waiter/tables/:tableId', component: <TableWaiterPage /> },
];

export default routesWaiter;
