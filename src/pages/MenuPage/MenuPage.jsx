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
  const { restId } = useParams();
  const [category, setActiveTab] = useState('Salads');

  const { isError, isLoading, data } = useQuery(
    ['dishes', category],
    async () => await getDishes(restId, category)
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
