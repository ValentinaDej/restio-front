import { FaPen } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';

import { Text, CheckBox } from 'shared';
import SelectIngredients from './SelectIngridients/SelectIngredients';
import classes from './Ingredients.module.scss';

const Ingredients = ({
  inputValue,
  selectedType,
  IngredientsTypes,
  firstIngredientRef,
  IngredientsToShow,
  selectedIngredients,
  showSelectedIngredients,
  handleTypeChange,
  handleInputChange,
  handleInputKeyDown,
  handleToggleIngredient,
  handleCheckSelected,
}) => {
  return (
    <>
      <Text mode="p" textAlign="left" fontSize={14} fontWeight={600}>
        Select Ingredients:
      </Text>
      <div className={classes.section__select}>
        <table className={classes.ingredients__table}>
          <thead className={classes.header__cell}>
            <tr>
              <th className={`${classes.header__cell}`}>
                <SelectIngredients
                  types={['All', ...IngredientsTypes]}
                  value={selectedType}
                  onChange={handleTypeChange}
                />
              </th>
              <th className={`${classes.header__cell}`}>
                <div className={classes.input__wrapper}>
                  <input
                    name="ingredient"
                    placeholder="Find"
                    autoComplete="off"
                    size="sm"
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={inputValue}
                    className={classes.input}
                  />
                  <div className={classes.pencil__icon}>
                    <FaPen />
                  </div>
                </div>
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
            {IngredientsToShow?.map((ingredient, index) => (
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
                    onChange={() => handleToggleIngredient(ingredient._id, ingredient.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ingredients;
