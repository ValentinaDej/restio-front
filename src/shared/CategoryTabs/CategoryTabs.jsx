import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './CategoryTabs.module.scss';

const testCategories = [
  'burger',
  'snack',
  'sauce',
  'hot-dog',
  'combo',
  'drinks',
  'pizza',
  'wok',
  'dessert',
];

const CategoryTabs = ({ mode = 'primary', categories = testCategories }) => {
  const [activeTab, setActiveTab] = useState(categories[0]);

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
};

export default CategoryTabs;
