import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import classes from './DishPage.module.scss';
import instance from 'api';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import Button from 'shared/Button/Button';
import Cart from 'components/Cart/Cart';
import Loader from 'shared/Loader/Loader';
import DishDescription from 'components/DishDescription/DishDescription';
import Footer from 'shared/Footer/Footer';
import Slider from '../../components/Slider/Slider';
import { getDishById } from 'api/dish';
import { addProduct, decreaseQuantity, increaseQuantity } from 'store/cart/cartSlice';
import { getProductFromState } from '../../store/cart/cartSelectors';
import { toast } from 'react-hot-toast';

const DishPage = () => {
  const [dishQuantity, setDishQuantity] = useState(0);
  const [recommendedDishes, setRecommendedDishes] = useState([]);
  const dishId = useParams().dishId;
  const restId = useParams().restId;
  const tableId = useParams().tableId;
  const dispatch = useDispatch();
  const storeData = useSelector(getProductFromState);
  const { pathname } = useLocation();
  const {
    isLoading,
    data: dish,
    error,
  } = useQuery(['dish', dishId], () => getDishById(dishId), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
  const idUsed = useCallback(
    (data) => {
      let idsToExclude = [];
      for (const item of storeData) {
        idsToExclude.push(item.id);
      }
      let filteredItems;
      idsToExclude.push(dishId);
      if (dish?.vegetarian === true) {
        let interimfilteredItems = data.filter((item) => item.vegetarian);
        filteredItems = interimfilteredItems.filter((item) => !idsToExclude.includes(item._id));
      } else {
        filteredItems = data.filter((item) => !idsToExclude.includes(item._id));
      }

      if (filteredItems.length <= 5) {
        setRecommendedDishes(filteredItems);
      } else {
        const first = Math.floor(Math.random() * (filteredItems.length - 5));
        const second = first + 4;
        let several = filteredItems.slice(first, second);
        setRecommendedDishes(several);
      }
    },
    [storeData, dishId, dish]
  );

  const fetchDishesList = useCallback(async () => {
    const res = await instance(`/dishes/restaurant/${restId}`, {
      params: {
        isActive: true,
      },
    });
    idUsed(res.data);
  }, [restId, idUsed]);

  useEffect(() => {
    fetchDishesList();
  }, [dishId, restId, fetchDishesList]);

  useEffect(() => {
    const isDishAlreadyAdded = storeData.filter((item) => item.id === dishId);
    if (isDishAlreadyAdded.length > 0) {
      setDishQuantity(isDishAlreadyAdded[0].quantity);
    } else {
      setDishQuantity(0);
    }
  }, [dishId, storeData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  if (isLoading) {
    return <Loader size="lg"></Loader>;
  }

  if (error) {
    return toast.error('Something went wrong... Please try again in few minutes');
  }

  const addItem = () => {
    const { picture: src, name: title, price, _id: id } = dish;
    dispatch(addProduct({ src, title, price, id }));
  };

  const increaseItem = () => {
    const { _id: id } = dish;
    dispatch(increaseQuantity(id));
  };

  const decreaseItem = () => {
    const { _id: id } = dish;
    dispatch(decreaseQuantity(id));
  };

  return (
    <>
      <main className={classes.dish}>
        <NavLink to={`/${restId}/tables/${tableId}`} className={classes.back}>
          <Button mode="outlined">Back</Button>
        </NavLink>
        <div className={classes.fullDish}>
          <div className={classes.dishInfoWarapper}>
            <img className={classes.dishImage} src={dish.picture} />
            <div className={classes.dishText}>
              <Title mode="h2" classname={classes.dishTitle}>
                {dish.name}
              </Title>
              <div className={`${classes.price_wrapper} ${classes.box} `}>
                <div>
                  <Text mode="p" classname={classes.subtitle}>
                    Price
                  </Text>
                  <span>${dish.price}</span>
                </div>
                <div>
                  <Text mode="p" classname={classes.subtitle}>
                    Weight
                  </Text>
                  <span>{dish.portionWeight} g</span>
                </div>
                {dishQuantity < 1 ? (
                  <div>
                    <Button onClick={addItem} className={classes.addButton}>
                      Add +
                    </Button>
                  </div>
                ) : (
                  <QuantityButton
                    mode="outlined"
                    addOne={increaseItem}
                    quantity={dishQuantity}
                    minusOne={decreaseItem}
                  >
                    {dishQuantity}
                  </QuantityButton>
                )}
              </div>
              <div className={classes.box}>
                <Text mode="p" classname={classes.subtitle}>
                  Ingredients
                </Text>
                <ul className={classes.ingr_item}>
                  {dish.ingredients?.map((item) => {
                    return <li key={item._id}>{item.name}</li>;
                  })}
                </ul>
              </div>
              <div className={`${classes.spicy_wrapper} ${classes.box} `}>
                <div className={classes.spicy_item}>
                  <Text mode="p" classname={classes.subtitle}>
                    Vegetarian
                  </Text>
                  <ul>
                    <li
                      className={
                        dish.vegetarian
                          ? `${classes.tab} ${classes[`${true}`]} `
                          : `${classes.tab} ${classes[`${false}`]} `
                      }
                    >
                      Yes
                    </li>
                    <li
                      className={
                        dish.vegetarian
                          ? `${classes.tab} ${classes[`${false}`]} `
                          : `${classes.tab} ${classes[`${true}`]} `
                      }
                    >
                      No
                    </li>
                  </ul>
                </div>
                <div className={classes.spicy_item}>
                  <Text mode="p" classname={classes.subtitle}>
                    Pescatarian
                  </Text>
                  <ul>
                    <li
                      className={
                        dish.pescatarian
                          ? `${classes.tab} ${classes[`${true}`]} `
                          : `${classes.tab} ${classes[`${false}`]} `
                      }
                    >
                      Yes
                    </li>
                    <li
                      className={
                        dish.pescatarian
                          ? `${classes.tab} ${classes[`${false}`]} `
                          : `${classes.tab} ${classes[`${true}`]} `
                      }
                    >
                      No
                    </li>
                  </ul>
                </div>
                <div className={classes.spicy_item}>
                  <Text mode="p" classname={classes.subtitle}>
                    Spicy
                  </Text>
                  <ul>
                    <li
                      className={
                        dish.spicy
                          ? `${classes.tab} ${classes[`${true}`]} `
                          : `${classes.tab} ${classes[`${false}`]} `
                      }
                    >
                      Yes
                    </li>
                    <li
                      className={
                        dish.spicy
                          ? `${classes.tab} ${classes[`${false}`]} `
                          : `${classes.tab} ${classes[`${true}`]} `
                      }
                    >
                      No
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DishDescription data={dish}></DishDescription>
        </div>
        <Cart />
        <div className={classes.recommended_block}>
          <Title mode="h3">Recommend to try</Title>
          <Slider data={recommendedDishes} restId={restId} tableId={tableId}></Slider>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default DishPage;
