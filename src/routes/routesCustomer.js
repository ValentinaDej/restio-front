import { lazy } from 'react';

const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const CustomerOrdersPage = lazy(() => import('pages/CustomerOrdersPage/CustomerOrdersPage'));
const DishPage = lazy(() => import('pages/DishPage/DishPage'));

const routesCustomer = [
  { path: ':restId/tables/:tableId', component: <MenuPage /> },
  { path: ':restId/tables/:tableId/orders', component: <CustomerOrdersPage /> },
  { path: ':restId/tables/:tableId/dishes/:dishId', component: <DishPage /> },
];

export default routesCustomer;
