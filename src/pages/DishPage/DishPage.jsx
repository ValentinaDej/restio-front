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
import { NavigateButtons } from '../../components/Orders/ui/NavigateButtons/NavigateButtons';
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
import { HfInference } from '@huggingface/inference';

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
  const [generatedText, setGeneratedText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const words = generatedText.split(' ');

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

  const generateText = useCallback(async () => {
    if (dish) {
      const key = process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY2;
      const hf = new HfInference(key);
      const model = 'declare-lab/flan-alpaca-large';
      // const text = 'Provide interesting facts about ${dish.name} meal';
      // const text = `When does ${dish.name} dish was invented?`;
      const text = `Create exquisite desription of ${dish.name}.`;
      const response = await hf.textGeneration({
        model: model,
        inputs: text,
        parameters: { max_new_tokens: 250 },
      });
      let textGen = response.generated_text;
      const lastDotIndex = textGen.lastIndexOf('.');
      let cuttedText = textGen.substring(0, lastDotIndex + 1);
      setGeneratedText(cuttedText);
      setIsLoaded(true);
      console.log(cuttedText);
      // let text =
      //   'Caesar is a classic salad made with a vinaigrette of romaine lettuce, croutons, and a vinaigrette dressing. The dressing is a vinaigrette made with olive oil, garlic, and a dash of lemon juice. The salad is topped with a vinaigrette of croutons, croutons, and a vinaigrette dressing. The dressing is a vinaigrette made with olive oil, garlic, and a dash of lemon juice. The salad is topped with croutons, croutons, and a vinaigrette dressing.';
      // const lastDotIndex = text.lastIndexOf('.');
      // let cuttedText = text.substring(0, lastDotIndex + 1);
      // setTimeout(() => {
      //   setIsLoaded(true);
      //   setGeneratedText(cuttedText);
      // }, 7000);
    }
  }, [dish]);

  useEffect(() => {
    generateText();
  }, [generateText]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index == 0) {
        setCurrentText(words[index] + ' ');
        index++;
      } else if (index < words.length - 1) {
        setCurrentText((prevText) => prevText + words[index] + ' ');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    setCurrentText('');
    return () => clearInterval(interval);
  }, [generatedText]);

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
    const { picture: src, name: title, price, _id: id } = dish;
    dispatch(decreaseQuantity(id));
  };

  const sliderNext = () => {
    const element = sliderRef.current;
    const elementWidth = element.getBoundingClientRect().width;
    console.log(elementWidth);
    if (elementWidth > 375) {
      const sliderWidth = 317 * recommendedDishes.length - 60;
      console.log(sliderWidth);
      let scrollAmount = elementWidth * (1 / 3);
      console.log(scrollAmount);
      let newRightValue = parseInt(getComputedStyle(element).right) + scrollAmount;
      const diff = sliderWidth - elementWidth - newRightValue;
      console.log('diff' + diff);
      if (diff < scrollAmount) {
        element.style.right = newRightValue + diff + 'px';
        console.log('fisrs');
      } else {
        element.style.right = newRightValue + 'px';
        console.log('second');
        return;
      }
    } else if (elementWidth < 375) {
      const scrollAmount = elementWidth;
      let newRightValue = parseFloat(getComputedStyle(element).right) + scrollAmount;
      console.log(newRightValue);
      if (newRightValue >= scrollAmount * recommendedDishes.length) {
        return;
      } else {
        element.style.right = newRightValue + 'px';
      }
    }
  };
  const sliderBack = () => {
    const element = sliderRef.current;
    const scrollAmount = 350;
    const newRightValue = parseInt(getComputedStyle(element).right) - scrollAmount;
    if (newRightValue <= 0) {
      element.style.right = 0 + 'px';
      element.style.transform = '1s ease';
    } else {
      element.style.right = newRightValue + 'px';
    }
  };
  return (
    <>
      <main className={classes.dish}>
        <NavLink to={`/${restId}/tables/${tableId}`} className={classes.back}>
          <NavigateButtons params={restId}>Back</NavigateButtons>
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
          <div className={classes.AIwrapper}>
            <Text mode="p" classname={`${classes.subtitle} ${classes.AItitle}`}>
              What does AI think about this dish:
            </Text>
            {isLoaded ? (
              <Text mode="p" classname={classes.AItext}>
                {currentText}
                <span className={classes.cursor}></span>
              </Text>
            ) : (
              <div className={classes.loader_AI}>
                <Loader size="sm"></Loader>
              </div>
            )}
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
              <div className={classes.slider_box} ref={sliderRef} style={{ transition: '1s ease' }}>
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
                      link={`/${restId}/tables/${tableId}/dishes/${item._id}`}
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
