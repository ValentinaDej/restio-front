import { lazy } from 'react';

const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));

const routesWaiter = [
  { path: 'waiter/tables/:restId', component: <TablesWaiterPage /> },
  { path: 'waiter/tables/:restId/:tableId', component: <TableWaiterPage /> },
];

export default routesWaiter;
