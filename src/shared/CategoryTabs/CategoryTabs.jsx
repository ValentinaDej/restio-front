import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './CategoryTabs.module.scss';
import { DISH_CATEGORIES } from 'utils/constants';

const CategoryTabs = ({
  mode = 'primary',
  categories = DISH_CATEGORIES,
  setActiveTab,
  activeTab,
}) => {
  // const [activeTab, setActiveTab] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  return (
    <div className={classes.category__tabs}>
      <ul className={classes.category__list}>
        {categories.map((category) => (
          <li key={category} className={classes.category__item}>
            <button
              className={`${classes.category__button} ${
                activeTab === category ? classes[`category__button_${mode}_active`] : ''
              } ${
                mode === 'outlined'
                  ? classes.category__button_outlined
                  : classes.category__button_primary
              }`}
              data-category={category}
              onClick={() => handleTabClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CategoryTabs.propTypes = {
  mode: PropTypes.oneOf(['primary', 'outlined']).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default CategoryTabs;
