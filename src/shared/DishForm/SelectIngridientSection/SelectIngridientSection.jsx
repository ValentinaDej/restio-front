import { FaSearch } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';

import Text from 'shared/Text/Text';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import CustomSelect from '../CustomSelect/CustomSelect';

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
  handleCheckSelected,
  showSelectedIngredients,
}) => {
  return (
    <>
      <Text mode="p" textAlign="left" fontSize={14} fontWeight={600}>
        Select ingridients:
      </Text>
      <div className={classes.section__select}>
        <table className={classes.ingredients__table}>
          <thead>
            <tr className={classes.table__header}>
              <th className={classes.header__cell}>
                <select
                  id="type"
                  value={selectedType}
                  onChange={handleTypeChange}
                  className={classes.select__type}
                >
                  <option value="">All types</option>
                  {ingridientsTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </th>
              <th className={classes.header__cell}>
                <input
                  name="ingredient"
                  placeholder="Find by name"
                  autoComplete="off"
                  size="sm"
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  value={inputValue}
                  className={classes.select__type}
                />
              </th>
              <th className={classes.header__cell}>
                {showSelectedIngredients ? (
                  <FaCheck className={classes.icon__selected} onClick={handleCheckSelected} />
                ) : (
                  <FaList className={classes.icon__selected} onClick={handleCheckSelected} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {ingridientsToShow?.map((ingredient, index) => (
              <tr
                key={ingredient._id}
                onClick={() => handleToggleIngredient(ingredient._id, ingredient.name)}
                className={`${classes.table__row} ${
                  selectedIngredients.has(ingredient._id) ? classes.selected : ''
                }`}
                ref={index === 0 ? firstIngredientRef : null}
                tabIndex={0}
              >
                <td>{ingredient.type}</td>
                <td>{ingredient.name}</td>
                <td>
                  <CheckBox
                    checked={selectedIngredients.has(ingredient._id)}
                    onClick={() => handleToggleIngredient(ingredient._id, ingredient.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className={classes.section__select}>
        <ul>
          <li className={`${classes.section__item_select} ${classes.fixedItem}`}>
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
            {showSelectedIngredients ? (
              <FaCheck className={classes.icon__selected} onClick={handleCheckSelected} />
            ) : (
              <FaList className={classes.icon__selected} onClick={handleCheckSelected} />
            )}
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
              <div className={classes.ingredient__container}>
                <span className={classes.ingredient__type}>{ingredient.type}</span>
                <span className={classes.ingredient__name}>{ingredient.name}</span>
              </div>
              <CheckBox
                checked={selectedIngredients.has(ingredient._id)}
                onClick={() => handleToggleIngredient(ingredient._id, ingredient.name)}
              />
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default SelectIngridientSection;
