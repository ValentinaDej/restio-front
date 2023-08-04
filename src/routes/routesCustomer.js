import { lazy } from 'react';

const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const CustomerOrdersPage = lazy(() => import('pages/CustomerOrdersPage/CustomerOrdersPage'));
const DishPage = lazy(() => import('pages/DishPage/DishPage'));

const routesCustomer = [
  { path: ':restId/:tableId', component: <MenuPage /> },
  { path: ':restId/:tableId/orders', component: <CustomerOrdersPage /> },
  { path: ':restId/:tableId/:dishId', component: <DishPage /> },
];

export default routesCustomer;
