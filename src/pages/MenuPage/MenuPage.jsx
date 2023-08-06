import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { toast } from 'react-hot-toast';

import CategoryTabs from 'shared/CategoryTabs/CategoryTabs';
import DishCard from 'shared/DishCard/DishCard';
import Cart from 'components/Cart/Cart';
import css from './MenuPage.module.scss';
import { getDishes } from 'api/dish';

const MenuPage = () => {
  const { restId, tableId } = useParams();
  const [category, setActiveTab] = useState('Salads');

  const { isError, isLoading, data } = useQuery(
    ['dishes', category],
    async () => await getDishes(restId, category),
    {
      // staleTime: 0, // Data is immediately considered stale and will be refetched on the next request
      // cacheTime: 0, // Data is never considered stale, and automatic refetching is disabled
      refetchOnWindowFocus: false, // Disable refetching when the window gains focus
      refetchOnReconnect: false, // Disable refetching when the network reconnects
      refetchInterval: false, // Disable automatic periodic refetching
    }
  );

  return (
    <>
      {isError && toast.error('Something went wrong... Please try again in few minutes')}
      <main className={css.main}>
        <CategoryTabs mode="outlined" setActiveTab={setActiveTab} activeTab={category} />
        <ul className={css.list}>
          {data?.data?.map(({ _id, picture, price, portionWeight, ingredients, name }) => (
            <li className={css.list__item} key={_id}>
              <DishCard
                id={_id}
                src={picture}
                title={name}
                ingredients={ingredients}
                weight={portionWeight}
                price={price}
                link={`/${restId}/${tableId}/${_id}`}
              />
            </li>
          ))}
        </ul>
        <Cart />
      </main>
    </>
  );
};

export default MenuPage;
