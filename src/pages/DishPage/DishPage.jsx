import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import classes from './DishPage.module.scss';
import instance from 'api';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import DishCard from 'shared/DishCard/DishCard';
import Button from 'shared/Button/Button';
import Cart from 'components/Cart/Cart';
import Loader from 'shared/Loader/Loader';
import Footer from 'shared/Footer/Footer';
import { getDishById } from 'api/dish';
import { addProduct, decreaseQuantity, increaseQuantity } from 'store/cart/cartSlice';
import { getProductFromState } from '../../store/cart/cartSelectors';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
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
  const sliderRef = useRef(null);

  const {
    isLoading,
    data: dish,
    error,
  } = useQuery(['dish', dishId], () => getDishById(dishId), {
    refetchOnWindowFocus: false, // Disable refetching when the window gains focus
    refetchOnReconnect: false, // Disable refetching when the network reconnects
    refetchInterval: false, // Disable automatic periodic refetching
  });
  const idUsed = useCallback(
    (data) => {
      let idsToExclude = [];
      for (const item of storeData) {
        idsToExclude.push(item.id);
      }
      idsToExclude.push(dishId);
      const filteredItems = data.filter((item) => !idsToExclude.includes(item._id));
      if (filteredItems.length <= 3) {
        setRecommendedDishes(filteredItems);
      } else {
        const first = Math.floor(Math.random() * (filteredItems.length - 5));
        const second = first + 5;
        let several = filteredItems.slice(first, second);
        setRecommendedDishes(several);
      }
    },
    [storeData, dishId]
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
    return (
      // <div className={classes.loader}>
      //   <div className={classes.spinner_dish}></div>
      // </div>
      <Loader size="lg"></Loader>
    );
  }

  if (error) {
    return toast.error('Something went wrong... Please try again in few minutes');
  }

  const addItem = () => {
    const { picture: src, name: title, price, _id: id } = dish;
    dispatch(addProduct({ src, title, price, id }));
  };

  const increaseItem = () => {
    const { picture: src, name: title, price, _id: id } = dish;
    dispatch(increaseQuantity(id));
  };

  const decreaseItem = () => {
    const { picture: src, name: title, price, _id: id } = dish;
    dispatch(decreaseQuantity(id));
  };

  const sliderNext = () => {
    const element = sliderRef.current;
    const elementWidth = element.getBoundingClientRect().width;
    console.log(elementWidth);
    const sliderWidth = 1510;
    const scrollAmount = elementWidth * (1 / 3);
    console.log(scrollAmount);
    let newRightValue = parseInt(getComputedStyle(element).right) + scrollAmount;
    console.log(newRightValue);
    const diff = sliderWidth - elementWidth - newRightValue;
    console.log('disff:' + diff);
    if (diff < scrollAmount) {
      element.style.right = newRightValue + diff + 'px';
    } else {
      element.style.right = newRightValue + 'px';
      return;
    }
    // const scrollAmount = 260 + 25;
    // const sliderWidth = 1500;
    // console.log(sliderWidth);
    // let newRightValue;
    // if (elementWidth >= 900) {
    //   element.style.right = sliderWidth - elementWidth + 'px';
    //   return;
    // }
    // newRightValue = parseInt(getComputedStyle(element).right) + scrollAmount;
    // console.log(newRightValue);
    // console.log('computed rest:' + (sliderWidth - elementWidth - newRightValue));
    // if (sliderWidth - elementWidth - newRightValue <= 400) {
    //   console.log('1 block');
    //   element.style.right = newRightValue + (sliderWidth - elementWidth - newRightValue) + 'px';
    // } else if (sliderWidth - elementWidth - newRightValue > 400) {
    //   console.log('2 block');
    //   element.style.right = newRightValue + 'px';
    // }
  };
  const sliderBack = () => {
    const element = sliderRef.current;
    console.log(element);
    const elementWidth = element.getBoundingClientRect().width;
    console.log(elementWidth);
    const scrollAmount = 350;
    const newRightValue = parseInt(getComputedStyle(element).right) - scrollAmount;
    console.log(newRightValue);
    if (newRightValue <= 0) {
      element.style.right = 0 + 'px';
    } else {
      element.style.right = newRightValue + 'px';
    }
  };
  return (
    <>
      <main className={classes.dish}>
        <NavLink to={`/${restId}/${tableId}`} className={classes.back}>
          <IoReturnDownBackOutline></IoReturnDownBackOutline>
          <span>Back to Menu</span>
        </NavLink>
        <div className={classes.fullDish}>
          <p className={classes.category}>{dish.type}</p>
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
                    classname={classes.quantity_buttons}
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
                    Vegeterian
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
        </div>
        <Cart />
        <div className={classes.recommended_block}>
          <Title mode="h3">Recommend to try</Title>
          <div className={classes.recomWrapper}>
            <MdNavigateBefore
              className={classes.arrowBefore}
              onClick={sliderBack}
            ></MdNavigateBefore>
            <MdNavigateNext className={classes.arrowNext} onClick={sliderNext}></MdNavigateNext>
            <div className={classes.sliderWrapper}>
              <div className={classes.slider_box} ref={sliderRef}>
                {recommendedDishes?.map((item) => {
                  return (
                    <DishCard
                      src={item.picture}
                      key={item._id}
                      id={item._id}
                      title={item.name}
                      ingredients={item.ingredients}
                      weight={item.portionWeight}
                      price={item.price}
                      link={`/${restId}/:tableId/${item._id}`}
                    ></DishCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DishPage;
