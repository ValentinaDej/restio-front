import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { FcAssistant } from '@react-icons/all-files/fc/FcAssistant';

import css from './MenuPage.module.scss';
import { CategoryTabs, DishCardSkeleton, DishCard, Button, Loader } from 'shared';
import { Cart } from 'components';
import { getAllDishes, getDishesForMenu } from 'api/dish';
import { getProductFromState } from 'store/cart/cartSelectors';

const MenuPage = () => {
  const navigate = useNavigate();
  const { restId, tableId } = useParams();
  const [category, setActiveTab] = useState('All');
  const { role } = useSelector((state) => state.auth);
  const cart = useSelector(getProductFromState);

  const { isError, isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['dishes', category],
      async ({ pageParam = 1 }) =>
        category === 'All'
          ? await getAllDishes(restId, true, pageParam)
          : await getDishesForMenu(restId, category, true, pageParam),

      {
        getNextPageParam: (lastPage, _pages) => {
          if (lastPage?.data?.page < lastPage?.data?.totalPages) {
            return lastPage.data.page + 1;
          }
          return undefined;
        },

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
              {data?.pages?.map((page) =>
                page?.data?.dishes?.map(
                  ({ _id, picture, price, portionWeight, ingredients, name }) => (
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
                  )
                )
              )}
            </>
          )}
        </ul>
        {hasNextPage && (
          <div className={css.button}>
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              <Button mode="outlined" size="sm" onClick={() => fetchNextPage()}>
                Load more
              </Button>
            )}
          </div>
        )}
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
        {cart?.length > 0 && (
          <a href="#cart" className={css['cart-button']}>
            Move to order
          </a>
        )}
      </section>
    </>
  );
};

export default MenuPage;
