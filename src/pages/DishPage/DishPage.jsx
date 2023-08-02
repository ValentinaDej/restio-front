import { NavLink } from 'react-router-dom';
import classes from './DishPage.module.scss';
import Title from 'shared/Title/Title';
import Text from 'shared/Text/Text';
import QuantityButton from 'shared/QuantityButton/QuantityButton';
import DishCard from 'shared/DishCard/DishCard';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { FaWeightHanging } from 'react-icons/fa';

const DishPage = (props) => {
  const isTrue = true;
  return (
    <div className={classes.dish}>
      <NavLink to="/customer/:restId/:tableId" className={classes.back}>
        <IoReturnDownBackOutline></IoReturnDownBackOutline>
        <span>Back to Menu</span>
      </NavLink>
      <div className={classes.fullDish}>
        <div className={classes.dishInfoWarapper}>
          <img
            className={classes.dishImage}
            src={
              'https://templates.iqonic.design/aprycot/html/dashboard/dist/assets/images/layouts/dish-detail/01.png'
            }
          />
          <div className={classes.dishText}>
            <Title mode="h2" classname={classes.dishTitle}>
              Beef burger
            </Title>
            <div className={`${classes.price_wrapper} ${classes.box} `}>
              <div>
                <Text mode="p" classname={classes.subtitle}>
                  Price
                </Text>
                <span>$ 8</span>
              </div>
              <div>
                <Text mode="p" classname={classes.subtitle}>
                  Weight
                </Text>
                <span>230 g</span>
              </div>
              <QuantityButton classname={classes.quantity_buttons}></QuantityButton>
            </div>
            <div className={classes.box}>
              <Text mode="p" classname={classes.subtitle}>
                Ingredients
              </Text>
              <ul className={classes.ingr_item}>
                <li>Beef</li>
                <li>Ketchup</li>
                <li>Onion</li>
                <li>Salad</li>
                <li>Onion</li>
                <li>Salad</li>
              </ul>
            </div>
            <div className={`${classes.spicy_wrapper} ${classes.box} `}>
              <div className={classes.spicy_item}>
                <Text mode="p" classname={classes.subtitle}>
                  Vegeterian
                </Text>
                <ul>
                  <li className={`${classes.tab} ${classes[`${isTrue}`]} `}>Yes</li>
                  <li className={`${classes.tab} ${classes[`${false}`]} `}>No</li>
                </ul>
              </div>
              <div className={classes.spicy_item}>
                <Text mode="p" classname={classes.subtitle}>
                  Pescatarian
                </Text>
                <ul>
                  <li className={`${classes.tab} ${classes[`${isTrue}`]} `}>Yes</li>
                  <li className={`${classes.tab} ${classes[`${false}`]} `}>No</li>
                </ul>
              </div>
              <div className={classes.spicy_item}>
                <Text mode="p" classname={classes.subtitle}>
                  Spicy
                </Text>
                <ul>
                  <li className={`${classes.tab} ${classes[`${false}`]} `}>Yes</li>
                  <li className={`${classes.tab} ${classes[`${isTrue}`]} `}>No</li>
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
    </div>
  );
};

export default DishPage;
