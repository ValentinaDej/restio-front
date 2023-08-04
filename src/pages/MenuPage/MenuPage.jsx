import CategoryTabs from 'shared/CategoryTabs/CategoryTabs';

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

  // const subscribe = async () => {
  //   const eventSource = new EventSource('http://localhost:3001/sse');

  //   eventSource.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     // Handle the updated dish status here and update your UI accordingly
  //     setMessage(eventData);
  //     console.log('eventData', eventData);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error('Error occurred with SSE connection:', error);
  //   };
  // };
  // useEffect(() => {
  //   subscribe();
  // }, []);
  return (
    <>
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
        <Cart />
      </main>
    </>
  );
};

export default MenuPage;
