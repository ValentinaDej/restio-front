import { lazy } from 'react';
import AIAssistant from '../pages/AIAssistant/AIAssistant';

const MenuPage = lazy(() => import('pages/MenuPage/MenuPage'));
const CustomerOrdersPage = lazy(() => import('pages/CustomerOrdersPage/CustomerOrdersPage'));
const DishPage = lazy(() => import('pages/DishPage/DishPage'));
const routesCustomer = [
  { path: ':restId/:tableId', component: <MenuPage /> },
  { path: ':restId/:tableId/orders', component: <CustomerOrdersPage /> },
  { path: ':restId/:tableId/:dishId', component: <DishPage /> },
  { path: ':restId/aia', component: <AIAssistant /> },
];

export default routesCustomer;
