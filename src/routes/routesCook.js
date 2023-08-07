import { Route } from 'react-router-dom';
import { PrivateRoute } from 'routes/RoutesComponents';
import { lazy } from 'react';

const DishesForCookPage = lazy(() => import('pages/DishesForCookPage/DishesForCookPage'));

const routesCook = [
  {
    path: 'cook/:restId',
    component: <DishesForCookPage />,
  },
];

export default routesCook;