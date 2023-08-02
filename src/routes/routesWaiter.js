import { lazy } from 'react';

const TablesWaiterPage = lazy(() => import('pages/TablesWaiterPage/TablesWaiterPage'));
const TableWaiterPage = lazy(() => import('pages/TableWaiterPage/TableWaiterPage'));
const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));

const routesWaiter = [
  { path: '', component: <TablesWaiterPage /> },
  { path: ':tableId', component: <TableWaiterPage /> },
  { path: ':tableId/menu', component: <MenuPage /> },
];

export default routesWaiter;
