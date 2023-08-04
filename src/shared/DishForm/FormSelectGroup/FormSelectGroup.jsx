import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { FaSearch } from 'react-icons/fa';
import { BiSolidTrash } from 'react-icons/bi';

import Select from 'shared/Select/Select';
import InputValid from 'shared/InputValid/InputValid';
import Text from 'shared/Text/Text';

import classes from './FormSelectGroup.module.scss';
import * as initialData from '../InitialState';

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

  const handleAddIngredient = (ingredientId) => {
    const isAlreadyAdded = fields.some((field) => {
      const valuesWithoutId = Object.values(field)
        .filter((key) => key !== field.id)
        .join('');
      return valuesWithoutId.toString() === ingredientId.toString();
    });

    if (!isAlreadyAdded) {
      append(ingredientId.toString());
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const enteredIngredient = event.target.value;
      const matchedIngredient = initialData.ingredientsList.find(
        (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
      );

      console.log(matchedIngredient);
      if (matchedIngredient) {
        const isAlreadyAdded = fields.some((field) => {
          const valuesWithoutId = Object.values(field)
            .filter((key) => key !== field.id)
            .join('');
          return valuesWithoutId.toString() === matchedIngredient.id.toString();
        });

        if (!isAlreadyAdded) {
          append(matchedIngredient.id.toString());
        }
      }

      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredIngredientsToShow = filteredIngredients.filter((ingredient) => {
    const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
    const isSelectedTypeAll = selectedType === '';
    const isSelectedTypeMatching = ingredient.type === selectedType;
    return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
  });

  return (
    <div className={classes.group__wrapper}>
      <div className={classes.column__wrapper}>
        <div className={classes.column}>
          <InputValid
            name="ingredient"
            placeholder="Your ingredient"
            autoComplete="off"
            size="sm"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={inputValue}
            icon={FaSearch}
            error={error.ingredients}
          />
          <Select id="type" value={selectedType} onChange={handleTypeChange} size="sm">
            <option value="">All</option>
            {initialData.typesOfIngredients.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <div className={classes.section__select}>
            <ul>
              {filteredIngredientsToShow.map((ingredient) => {
                return (
                  <li
                    key={ingredient.id}
                    onClick={() => handleAddIngredient(ingredient.id)}
                    className={classes.section__item_select}
                  >
                    {ingredient.name}
                  </li>
                );
              })}
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
            {fields.map((field, index) => (
              <div key={field.id}>
                <Controller
                  name={`ingredients[${index}]`}
                  control={control}
                  render={({ field }) => (
                    <div className={classes.section__item}>
                      <input {...field} type="hidden" />{' '}
                      {initialData.ingredientsList.find((ing) => ing.id === parseInt(field.value))
                        ?.name || 'Unknown Ingredient'}
                      <div className={classes.icon__wrapper} onClick={() => remove(index)}>
                        <BiSolidTrash />
                      </div>
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
