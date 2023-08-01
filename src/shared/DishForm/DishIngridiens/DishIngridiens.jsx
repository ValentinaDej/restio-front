import React, { useState } from 'react';

import { LiaSearchSolid } from 'react-icons/lia';
import { BiSolidTrash } from 'react-icons/bi';

import Select from 'shared/Select/Select';
import Input from 'shared/Input/Input';
import Text from 'shared/Text/Text';

import classes from '../DishForm.module.scss';
import * as initialData from '../InitialState';

const DishIngredients = ({
  selectedIngredients,
  setSelectedIngredients,
  handleRemoveIngredient,
  handleIngredientChange,
  selectedType,
  handleTypeChange,
  filteredIngredients,
  errors,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const enteredIngredient = event.target.value;
      const matchedIngredient = filteredIngredients.find(
        (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
      );

      if (matchedIngredient) {
        const newSelectedIngredients = new Set(selectedIngredients);
        newSelectedIngredients.add(matchedIngredient.id);
        setSelectedIngredients(newSelectedIngredients);
        setInputValue('');
      }
    }
  };

  const handleAddIngredient = () => {
    const matchedIngredient = initialData.ingredientsList.find(
      (ingredient) => ingredient.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (matchedIngredient) {
      setSelectedIngredients((prevIngredients) => [...prevIngredients, matchedIngredient]);
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
    <>
      <div className={classes.column}>
        <div className={classes.field__wrapper}>
          <Select id="type" value={selectedType} onChange={handleTypeChange} size="sm">
            <option value="">All</option>
            {initialData.typesOfIngredients.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <div className={classes.field__wrapper}>
          <div className={classes.section__select}>
            <ul className={classes.select_list}>
              {filteredIngredientsToShow.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className={`${classes.select_option} ${
                    selectedIngredients.has(ingredient.id) ? classes.selected : ''
                  }`}
                  onClick={() => handleIngredientChange(ingredient.id)}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.field__wrapper}>
          <div className={classes.input_wrapper}>
            <Input
              type="text"
              name="ingredient"
              placeholder="Your ingredient"
              size="sm"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <LiaSearchSolid onClick={handleAddIngredient} className={classes.input_icon} />
          </div>
        </div>
        <Text mode="p" textAlign="left" fontWeight={400} color="var(--color-dark)">
          Selected ingredients:
        </Text>
        <ul className={classes.section__wrapper}>
          {Array.from(selectedIngredients).map((ingredientId) => {
            const ingredient = initialData.ingredientsList.find((ing) => ing.id === ingredientId);
            return (
              <li key={ingredientId} className={classes.section__item}>
                {ingredient ? ingredient.name : 'Unknown Ingredient'}

                <BiSolidTrash
                  onClick={() => handleRemoveIngredient(ingredientId)}
                  className={classes.section__icon}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {errors.ingredients && (
        <Text mode="p" textAlign="left" fontSize={8} fontWeight={400}>
          {errors.ingredients.message}
        </Text>
      )}
    </>
  );
};

export default DishIngredients;
