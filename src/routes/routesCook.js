import { lazy } from 'react';

const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));

const routesCook = [
  {
    path: 'cook/:restId',
    component: <DishesForCookPage />,
  },
];

export default routesCook;
