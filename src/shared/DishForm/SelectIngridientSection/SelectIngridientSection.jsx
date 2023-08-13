import Select from 'shared/Select/Select';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { FaSearch } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

import classes from './SelectIngridientSection.module.scss';

const SelectIngridientSection = ({
  selectedType,
  ingridientsTypes,
  handleTypeChange,
  handleInputChange,
  handleInputKeyDown,
  inputValue,
  ingridientsToShow,
  selectedIngredients,
  firstIngredientRef,
  handleToggleIngredient,
}) => {
  return (
    <>
      <Select id="type" value={selectedType} onChange={handleTypeChange} size="sm">
        <option value="">All</option>
        <option value="Selected">Selected</option>
        {ingridientsTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <div className={classes.section__select}>
        <ul>
          <li className={classes.section__item_select}>
            <input
              name="ingredient"
              placeholder="find ingredient"
              autoComplete="off"
              size="sm"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              value={inputValue}
              className={classes.item__search}
            />
            <FaSearch className={classes.icon__search} />
          </li>
          {ingridientsToShow?.map((ingredient, index) => (
            <li
              key={ingredient._id}
              onClick={() => handleToggleIngredient(ingredient._id, ingredient.name)}
              className={`${classes.section__item_select} ${
                selectedIngredients.has(ingredient._id) ? classes.selected : ''
              }`}
              ref={index === 0 ? firstIngredientRef : null}
              tabIndex={0}
            >
              {ingredient.name}
              <CheckBox
                checked={selectedIngredients.has(ingredient._id)}
                onClick={() => handleToggleIngredient(ingredient._id, ingredient.name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectIngridientSection;
