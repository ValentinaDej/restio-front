import { lazy } from 'react';

const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));

const routesCook = [{ path: ':restId/cook', component: <DishesForCookPage /> }];

export default routesCook;
