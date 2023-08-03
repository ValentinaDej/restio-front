import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './DishPage.module.scss';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import DishCard from 'shared/DishCard/DishCard';
import { IoReturnDownBackOutline } from 'react-icons/io5';

const DishPage = (props) => {
  const [dish, setDish] = useState([]);
  const params = useParams().dishId;
  const isTrue = true;
  const getDishById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/dishes/${params}`);
      console.log(response.data);
      setDish(response.data);
      return response.data;
    } catch (err) {
      console.error(err.toJSON());
    }
  };
  useEffect(() => {
    getDishById();
  }, []);
  return (
    <main className={classes.dish}>
      <NavLink to="/customer/:restId/:tableId" className={classes.back}>
        <IoReturnDownBackOutline></IoReturnDownBackOutline>
        <span>Back to Menu</span>
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
              <QuantityButton classname={classes.quantity_buttons}></QuantityButton>
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
      <div>
        <Title mode="h3">Recommend to try</Title>
        <div className={classes.recommend_wrapp}>
          <div className={classes.card_wrapper}>
            <DishCard src="https://templates.iqonic.design/aprycot/html/dashboard/dist/assets/images/layouts/dish-detail/01.png"></DishCard>
          </div>
          <div className={classes.card_wrapper}>
            <DishCard src="https://templates.iqonic.design/aprycot/html/dashboard/dist/assets/images/layouts/dish-detail/01.png"></DishCard>
          </div>
          <div className={classes.card_wrapper}>
            <DishCard src="https://templates.iqonic.design/aprycot/html/dashboard/dist/assets/images/layouts/dish-detail/01.png"></DishCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DishPage;
