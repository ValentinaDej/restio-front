import { lazy } from 'react';
import AIAssistant from '../pages/AIAssistant/AIAssistant';

const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const CustomerOrdersPage = lazy(() => import('pages/CustomerOrdersPage/CustomerOrdersPage'));
const DishPage = lazy(() => import('pages/DishPage/DishPage'));

const routesCustomer = [
  { path: ':restId/tables/:tableId', component: <MenuPage /> },
  { path: ':restId/tables/:tableId/orders', component: <CustomerOrdersPage /> },
  { path: ':restId/tables/:tableId/dishes/:dishId', component: <DishPage /> },
  { path: ':restId/tables/:tableId/aia', component: <AIAssistant /> },
];

export default routesCustomer;
