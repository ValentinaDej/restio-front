import { FaPen } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';

import Text from 'shared/Text/Text';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import CustomSelect from '../CustomSelect/CustomSelect';
import classes from './SelectIngridientSection.module.scss';

const SelectIngridientSection = ({
  inputValue,
  selectedType,
  ingridientsTypes,
  firstIngredientRef,
  ingridientsToShow,
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
        Select ingridients:
      </Text>
      <div className={classes.section__select}>
        <table className={classes.ingredients__table}>
          <thead className={classes.header__cell}>
            <tr>
              {/* <th className={classes.header__cell}> */}
              {/* <select
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
                </select> */}
              {/* </th> */}
              <th className={`${classes.header__cell}`}>
                <CustomSelect
                  types={ingridientsTypes}
                  value={selectedType} // Зміни цей рядок
                  onChange={handleTypeChange}
                />
              </th>
              <th className={`${classes.header__cell}`}>
                <div className={classes.input__wrapper}>
                  <input
                    name="ingredient"
                    placeholder="Find by name"
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

export default SelectIngridientSection;
