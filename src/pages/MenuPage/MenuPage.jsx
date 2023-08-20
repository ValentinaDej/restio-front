import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { FcAssistant } from '@react-icons/all-files/fc/FcAssistant';

import css from './MenuPage.module.scss';
import { CategoryTabs, DishCardSkeleton, DishCard, Button } from 'shared';

import { Cart } from 'components';
import { getDishesForMenu } from 'api/dish';

const MenuPage = () => {
  const navigate = useNavigate();
  const { restId, tableId } = useParams();
  const [category, setActiveTab] = useState('Salads');
  const { role } = useSelector((state) => state.auth);

  const { isError, isLoading, data } = useQuery(
    ['dishes', category],
    async () => await getDishesForMenu(restId, category, true),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );

  return (
    <>
      {isError && toast.error('Something went wrong... Please try again in few minutes')}
      <section className={css.main}>
        {role && (
          <div className={css.wrapper}>
            <Button onClick={() => navigate(-1)} size="sm" mode="outlined">
              Back
            </Button>
          </div>
        )}
        <CategoryTabs mode="outlined" setActiveTab={setActiveTab} activeTab={category} />

        <ul className={css.list}>
          {isLoading ? (
            [1, 2, 3].map((item) => (
              <li className={css.list__item} key={item}>
                <DishCardSkeleton />
              </li>
            ))
          ) : (
            <>
              {data?.data?.map(({ _id, picture, price, portionWeight, ingredients, name }) => (
                <li className={css.list__item} key={_id}>
                  <DishCard
                    id={_id}
                    src={picture}
                    title={name}
                    ingredients={ingredients}
                    weight={portionWeight}
                    price={price}
                    link={`/${restId}/tables/${tableId}/dishes/${_id}`}
                  />
                </li>
              ))}
            </>
          )}
        </ul>

        <Cart />
        <div className={css.aiaWrapper}>
          <button
            className={`${css['button-circle']}`}
            onClick={() => navigate(`/${restId}/tables/${tableId}/aia`)}
            data-tip="Open Assistant"
          >
            <FcAssistant size={`30`} />
          </button>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
