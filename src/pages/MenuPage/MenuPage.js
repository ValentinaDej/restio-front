import CategoryTabs from 'shared/CategoryTabs/CategoryTabs';
import Header from 'shared/Header/Header';
import DishCard from 'shared/DishCard/DishCard';
import css from './MenuPage.module.scss';
import defaultSrc from '../../assets/img-template.jpg';
import Cart from 'components/Cart/Cart';

const defaultValues = {
  src: defaultSrc,
  title: 'Pork Tenderloin',
  ingredients: [
    'Pork',
    'Garlic',
    'Oil',
    'White wine',
    'Shallot',
    'Pork',
    'Garlic',
    'Oil',
    'White wine',
    'Shallot',
  ],
  weight: 320,
  price: 7.89,
};

const MenuPage = () => {
  const { src, title, ingredients, weight, price } = defaultValues;

  return (
    <>
      <Header role="customer" />
      <Cart />
      <main className={css.main}>
        <CategoryTabs mode="outlined" />
        <ul className={css.list}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <li className={css.list__item} key={index}>
              <DishCard
                id={item}
                src={src}
                title={title}
                ingredients={ingredients}
                weight={weight}
                price={price}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default MenuPage;
