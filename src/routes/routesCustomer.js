import { lazy } from 'react';

const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const CustomerOrdersPage = lazy(() => import('pages/CustomerOrdersPage/CustomerOrdersPage'));
const DishPage = lazy(() => import('pages/DishPage/DishPage'));

const routesCustomer = [
  { path: '', component: <MenuPage /> },
  { path: 'orders', component: <CustomerOrdersPage /> },
  { path: ':dishId', component: <DishPage /> },
];

export default routesCustomer;
