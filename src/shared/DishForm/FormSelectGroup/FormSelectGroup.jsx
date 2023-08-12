import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FaSearch } from 'react-icons/fa';
import { BiSolidTrash } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

import DraggableIngredient from '../DraggableIngredient/DraggableIngredient';

import Select from 'shared/Select/Select';
import Text from 'shared/Text/Text';

import classes from './FormSelectGroup.module.scss';

const FormSelectGroup = ({ ingridients, selectedIngredients, setSelectedIngredients }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const firstIngredientRef = useRef(null);

  const uniqueTypes = Array.from(new Set(ingridients?.map((ingredient) => ingredient.type)));
  const ingridientsTypes = uniqueTypes
    .filter((type) => type !== undefined)
    .sort((a, b) => a.localeCompare(b));

  const ingridientsToShow = ingridients?.filter((ingredient) => {
    const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
    const isSelectedTypeAll = selectedType === '';
    const isSelectedTypeMatching = ingredient.type === selectedType;
    const isSelectedTypeSelected = selectedType === 'Selected';

    if (isSelectedTypeSelected) {
      return selectedIngredients.has(ingredient._id);
    }

    return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
  });

  const handleTypeChange = (event) => {
    const newType = event.target.value;

    setSelectedType(newType);
  };

  const handleToggleIngredient = (ingredientId, ingredientName) => {
    setSelectedIngredients((prevIngredients) => {
      const updatedIngredients = new Map(prevIngredients);
      if (updatedIngredients.has(ingredientId)) {
        updatedIngredients.delete(ingredientId);
      } else {
        updatedIngredients.set(ingredientId, ingredientName);
      }
      return updatedIngredients;
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (ingridientsToShow.length === 1) {
        const matchedIngredient = ingridientsToShow[0];
        handleToggleIngredient(matchedIngredient._id, matchedIngredient.name);
        setInputValue('');
      } else if (ingridientsToShow.length > 1) {
        firstIngredientRef.current.focus();
      }
    }
  };

  const moveIngredient = (fromIndex, toIndex) => {
    const selectedIngredientsArray = Array.from(selectedIngredients.entries());
    const [movedIngredient] = selectedIngredientsArray.splice(fromIndex, 1);
    selectedIngredientsArray.splice(toIndex, 0, movedIngredient);
    const newSelectedIngredients = new Map(selectedIngredientsArray);
    setSelectedIngredients(newSelectedIngredients);
  };

  return (
    <div className={classes.group__wrapper}>
      <div className={classes.column__wrapper}>
        <div className={classes.column}>
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
                  <div className={classes.checkbox}>
                    {selectedIngredients.has(ingredient._id) && <FaCheck />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.column}>
          <DndProvider backend={HTML5Backend}>
            <div className={classes.section}>
              <div className={classes.field__wrapper}>
                <Text mode="p" textAlign="left" fontSize={16} fontWeight={600}>
                  Selected ingridients:
                </Text>
              </div>
              {Array.from(selectedIngredients.entries()).map(
                ([ingredientId, ingredientName], index) => (
                  // <div key={ingredientId}>{ingredientName}</div>
                  <DraggableIngredient
                    showIcon={true}
                    key={ingredientId}
                    ingredientId={ingredientId}
                    ingredientName={ingredientName}
                    index={index}
                    moveIngredient={moveIngredient}
                  />
                )
              )}
            </div>
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default FormSelectGroup;
