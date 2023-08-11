import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { FaSearch } from 'react-icons/fa';
import { BiSolidTrash } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

import Select from 'shared/Select/Select';
import InputValid from 'shared/InputValid/InputValid';
import Text from 'shared/Text/Text';

import classes from './FormSelectGroup.module.scss';

const FormSelectGroup = ({
  selectedType,
  handleTypeChange,
  filteredIngredients,
  control,
  fields,
  append,
  remove,
  setError,
  clearErrors,
  error,
  isSubmitted,
  isSubmitSuccessful,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());

  const uniqueTypes = Array.from(
    new Set(filteredIngredients?.map((ingredient) => ingredient.type))
  );

  const ingridientsTypes = uniqueTypes
    .filter((type) => type !== undefined)
    .sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    setInputValue(inputValue || ''); // Встановіть пустий рядок, якщо inputValue неконтрольований
  }, [inputValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      clearErrors('ingredients');
      return;
    }

    if (fields.length === 0 && isSubmitted) {
      setError('ingredients', {
        type: 'manual',
        message: 'At least one ingredient is required',
      });
    } else {
      clearErrors('ingredients');
    }
  }, [fields, isSubmitted, isSubmitSuccessful, setError, clearErrors]);

  // const handleAddIngredient = (ingredientId) => {
  //   console.log(fields);
  //   const isAlreadyAdded = fields.some((field) => {
  //     const valuesWithoutId = Object.values(field)
  //       .filter((key) => key !== field.id)
  //       .join('');
  //     return valuesWithoutId.toString() === ingredientId.toString();
  //   });

  //   if (!isAlreadyAdded) {
  //     append(ingredientId.toString());
  //   }
  // };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const enteredIngredient = event.target.value;
      const matchedIngredient = filteredIngredients.find(
        (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
      );

      if (matchedIngredient) {
        const isAlreadyAdded = fields.some((field) => {
          const valuesWithoutId = Object.values(field)
            .filter((key) => key !== field.id)
            .join('');
          return valuesWithoutId.toString() === matchedIngredient._id.toString();
        });
        if (!isAlreadyAdded) {
          append(matchedIngredient._id.toString());
        }
      }
      setInputValue('');
    }
  };

  const handleAddIngredient = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => new Set([...prevIngredients, ingredientId]));
  };

  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => {
      const updatedIngredients = new Set(prevIngredients);
      updatedIngredients.delete(ingredientId);
      return updatedIngredients;
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleToggleIngredient = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => {
      const updatedIngredients = new Set(prevIngredients);
      if (updatedIngredients.has(ingredientId)) {
        updatedIngredients.delete(ingredientId);
      } else {
        updatedIngredients.add(ingredientId);
      }
      return updatedIngredients;
    });
  };

  const filteredIngredientsToShow = filteredIngredients?.filter((ingredient) => {
    const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
    const isSelectedTypeAll = selectedType === '';
    const isSelectedTypeMatching = ingredient.type === selectedType;
    return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
  });

  return (
    <div className={classes.group__wrapper}>
      <div className={classes.column__wrapper}>
        <div className={classes.column}>
          {/* <input
            name="ingredient"
            placeholder="Your ingredient"
            autoComplete="off"
            size="sm"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={inputValue}
            icon={FaSearch}
            //error={error.ingredients}
          /> */}
          <Select id="type" value={selectedType} onChange={handleTypeChange} size="sm">
            <option value="">All</option>
            {ingridientsTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <div className={classes.section__select}>
            {/* <ul>
              <li>
                <input
                  name="ingredient"
                  placeholder="Your ingredient"
                  autoComplete="off"
                  size="sm"
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  value={inputValue}
                />
                <FaSearch className={classes.icon__search} />
              </li>
              {filteredIngredientsToShow?.map((ingredient) => {
                return (
                  <li
                    key={ingredient._id}
                    onClick={() => handleAddIngredient(ingredient._id)}
                    className={classes.section__item_select}
                  >
                    {ingredient.name}
                  </li>
                );
              })}
            </ul>
             */}
            <ul>
              <li className={classes.search__icon}>
                <input
                  name="ingredient"
                  placeholder="Your ingredient"
                  autoComplete="off"
                  size="sm"
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  value={inputValue}
                />
                <FaSearch className={classes.icon__search} />
              </li>
              {filteredIngredientsToShow?.map((ingredient) => (
                <li
                  key={ingredient._id}
                  onClick={() => handleToggleIngredient(ingredient._id)}
                  className={`${classes.section__item_select} ${
                    selectedIngredients.has(ingredient._id) ? classes.selected : ''
                  }`}
                >
                  {ingredient.name}
                  <div className={classes.checkbox}>
                    {selectedIngredients.has(ingredient._id) && <FaCheck />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.section}>
            <div className={classes.field__wrapper}>
              <Text mode="p" textAlign="left" fontSize={16} fontWeight={600}>
                Selected ingridients:
              </Text>
            </div>
            {Array.from(selectedIngredients).map((field, index) => (
              <div key={field}>
                {console.log(field)}
                {console.log(filteredIngredients)}
                <Controller
                  name={`ingredients[${index}]`}
                  control={control}
                  render={({ field }) => (
                    <div className={classes.section__item}>
                      <input {...field} type="hidden" />
                      {filteredIngredients.find((ing) => ing._id.toString() === field.toString())
                        ?.name || 'Unknown Ingredient'}
                      {/* <div className={classes.icon__wrapper} onClick={() => remove(index)}>
                        <BiSolidTrash />
                      </div> */}
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSelectGroup;
