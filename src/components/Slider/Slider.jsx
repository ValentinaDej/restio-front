import { useRef } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';

import classes from 'pages/DishPage/DishPage.module.scss';
import { DishCard } from 'shared';

export const Slider = ({ data: recommendedDishes, restId, tableId }) => {
  const sliderRef = useRef(null);
  const sliderNext = () => {
    const element = sliderRef.current;
    const elementWidth = element.getBoundingClientRect().width;
    if (elementWidth >= 375) {
      const sliderWidth = 300 * recommendedDishes.length;
      if (sliderWidth <= elementWidth) {
        return;
      }
      let scrollAmount = elementWidth * (1 / 3);
      let newRightValue = parseInt(getComputedStyle(element).right) + scrollAmount;
      const diff = sliderWidth - elementWidth - newRightValue;
      if (diff < scrollAmount) {
        element.style.right = newRightValue + diff + 'px';
      } else {
        element.style.right = newRightValue + 'px';
        return;
      }
    } else if (elementWidth < 375) {
      const scrollAmount = elementWidth;
      let newRightValue = parseFloat(getComputedStyle(element).right) + scrollAmount;
      if (newRightValue >= scrollAmount * recommendedDishes.length - 5) {
        element.style.right = scrollAmount * (recommendedDishes.length - 1) + 'px';
        return;
      } else {
        element.style.right = newRightValue + 'px';
      }
    }
  };
  const sliderBack = () => {
    const element = sliderRef.current;
    const elementWidth = element.getBoundingClientRect().width;
    if (elementWidth >= 375) {
      const sliderWidth = 300 * recommendedDishes.length;
      let scrollAmount = elementWidth * (1 / 3);
      let newRightValue = parseInt(getComputedStyle(element).right) - scrollAmount;
      if (newRightValue < 0) {
        element.style.right = 0 + 'px';
      } else {
        element.style.right = newRightValue + 'px';
        return;
      }
    } else if (elementWidth < 375) {
      const scrollAmount = elementWidth;
      let newRightValue = parseFloat(getComputedStyle(element).right) - scrollAmount;
      if (newRightValue <= 0) {
        element.style.right = 0 + 'px';
        return;
      } else {
        element.style.right = newRightValue + 'px';
      }
    }
  };
  return (
    <div className={classes.recomWrapper}>
      <MdNavigateBefore className={classes.arrowBefore} onClick={sliderBack}></MdNavigateBefore>
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
  );
};
