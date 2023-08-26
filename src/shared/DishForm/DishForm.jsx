import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

import { Button, Select, CheckBox, Text, InputValid, FileUploader, Loader } from 'shared';
import DishTypeOptions from './DishTypeOptions/DishTypeOptions';
import Ingredients from './Ingredients/Ingredients';
import SortIngredients from './SortIngridients/SortIngredients';

import classes from './DishForm.module.scss';

export const DishForm = ({
  onSubmit,
  category,
  initialState,
  ingredientsList,
  selectedIngredientsMap,
  isEditing,
  handleBack,
  isSaving,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState(selectedIngredientsMap);
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showSelectedIngredients, setShowSelectedIngredients] = useState(false);

  const firstIngredientRef = useRef(null);
  const fileUploaderRef = useRef();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: initialState,
    shouldUseNativeValidation: false,
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const selectedIngredientIds = Array.from(selectedIngredients.keys());
    const picture = await fileUploaderRef.current.handleUpload();
    delete data.image;

    if (picture) {
      onSubmit({ ...data, picture: picture, ingredients: selectedIngredientIds });
      fileUploaderRef.current.clearFile();
    } else {
      const { picture, ...dataWithoutPicture } = data;
      onSubmit({ ...dataWithoutPicture, ingredients: selectedIngredientIds });
    }
    reset();
  };

  const cleareForm = () => {
    reset();
    setSelectedIngredients(new Map());
    fileUploaderRef.current.clearFile();
  };

  const uniqueTypes = Array.from(new Set(ingredientsList?.map((ingredient) => ingredient.type)));
  const IngredientsTypes = uniqueTypes
    .filter((type) => type !== undefined)
    .sort((a, b) => a.localeCompare(b));

  const IngredientsToShow = ingredientsList?.filter((ingredient) => {
    const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
    const isSelectedTypeAll = selectedType === '';
    const isSelectedTypeMatching = ingredient.type === selectedType;
    const isSelectedTypeSelected = selectedType === 'Selected';

    if (isSelectedTypeSelected) {
      return selectedIngredients.has(ingredient._id);
    }

    return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
  });

  const handleTypeChange = (type) => {
    if (type === 'All') {
      setSelectedType('');
    } else setSelectedType(type);
  };

  const handleCheckSelected = () => {
    setShowSelectedIngredients(!showSelectedIngredients);
    if (showSelectedIngredients) {
      setSelectedType('');
    } else {
      setSelectedType('Selected');
    }
    setInputValue('');
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
      if (IngredientsToShow.length === 1) {
        const matchedIngredient = IngredientsToShow[0];
        handleToggleIngredient(matchedIngredient._id, matchedIngredient.name);
        setInputValue('');
      } else if (IngredientsToShow.length > 1) {
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
    <div>
      {isSaving ? (
        <Loader />
      ) : (
        <div className={`${classes.form}`}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={classes.field__wrapper_right}>
              <CheckBox label="active" name="isActive" register={register} />
            </div>
            <InputValid
              name="name"
              placeholder="Dish name"
              autoComplete="off"
              size="sm"
              error={errors.name}
              validationRules={{
                required: 'Name is a required field',
                pattern: {
                  value: /^.{2,50}$/,
                  message: 'Invalid name',
                },
              }}
              register={register}
              maxLength={30}
            />

            <div className={classes.column__wrapper}>
              <div className={classes.column}>
                <div className={classes.select__wrapper}>
                  <Select
                    name="type"
                    defaultValue=""
                    register={register}
                    size="sm"
                    error={errors.type ? 'error' : 'noError'}
                    rules={{
                      required: 'Dish type is required',
                    }}
                  >
                    <option value="" disabled hidden style={{ color: 'var(--color-danger)' }}>
                      Select dish type
                    </option>
                    {category?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  {errors.type && (
                    <Text
                      mode="p"
                      textAlign="left"
                      fontSize={10}
                      fontWeight={400}
                      color="var(--color-gray)"
                    >
                      {errors.type.message}
                    </Text>
                  )}
                </div>

                <DishTypeOptions register={register} />
                <div className={classes.img__wrapper}>
                  <FileUploader ref={fileUploaderRef} onEditPhoto={initialState.picture} />
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.row__wrapper}>
                  <div className={classes.rowfield__wrapper}>
                    <div className={classes.input__wrapper}>
                      <InputValid
                        type="text"
                        name="portionWeight"
                        placeholder="Weight"
                        autoComplete="Weight (gram)"
                        size="sm"
                        icon={GiWeight}
                        error={errors.portionWeight}
                        validationRules={{
                          required: 'Dish weight is a required field',
                          pattern: {
                            value: /^[1-9]\d{0,3}$|^10000$/,
                            message: 'A number between 1 and 10000',
                          },
                        }}
                        register={register}
                        onKeyDown={(event) => {
                          const allowedKeys = [
                            '0',
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            'Enter',
                            'Backspace',
                            'ArrowUp',
                            'ArrowDown',
                            'ArrowLeft',
                            'ArrowRight',
                            'Tab',
                          ];
                          if (!allowedKeys.includes(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength={5}
                      />
                    </div>
                  </div>
                  <div className={classes.rowfield__wrapper}>
                    <div className={classes.input__wrapper}>
                      <InputValid
                        type="text"
                        name="price"
                        placeholder="Price"
                        autoComplete="Price"
                        size="sm"
                        icon={FaMoneyBillAlt}
                        error={errors.price}
                        validationRules={{
                          required: 'Dish price is a required field',
                          pattern: {
                            value: /^[0-9]*(\.[0-9]{0,2})?$/,
                            message: 'A positive number with up to 2 decimal places',
                          },
                        }}
                        register={register}
                        onKeyDown={(event) => {
                          const allowedKeys = [
                            '0',
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '.',
                            'Enter',
                            'Backspace',
                            'ArrowUp',
                            'ArrowDown',
                            'ArrowLeft',
                            'ArrowRight',
                            'Tab',
                          ];
                          if (!allowedKeys.includes(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>
                <Ingredients
                  selectedType={selectedType}
                  IngredientsTypes={IngredientsTypes}
                  handleTypeChange={handleTypeChange}
                  handleInputChange={handleInputChange}
                  handleInputKeyDown={handleInputKeyDown}
                  inputValue={inputValue}
                  IngredientsToShow={IngredientsToShow}
                  selectedIngredients={selectedIngredients}
                  firstIngredientRef={firstIngredientRef}
                  handleToggleIngredient={handleToggleIngredient}
                  handleCheckSelected={handleCheckSelected}
                  showSelectedIngredients={showSelectedIngredients}
                />
              </div>
            </div>
            {selectedIngredients.size > 0 && (
              <SortIngredients
                selectedIngredients={selectedIngredients}
                moveIngredient={moveIngredient}
              />
            )}
            <div className={classes.button__wrapper}>
              {isEditing ? (
                <>
                  <Button type="submit" size="sm">
                    Update
                  </Button>
                  <Button type="button" mode={'outlined'} onClick={handleBack} size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button type="submit" size="sm">
                    Create
                  </Button>
                  <Button type="button" mode={'outlined'} onClick={cleareForm} size="sm">
                    Clear
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

DishForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialState: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    vegetarian: PropTypes.bool,
    spicy: PropTypes.bool,
    pescatarian: PropTypes.bool,
    portionWeight: PropTypes.string,
    price: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  Ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedIngredientsMap: PropTypes.instanceOf(Map),
  isEditing: PropTypes.bool,
};

DishForm.defaultProps = {
  initialState: {
    name: '',
    type: '',
    vegetarian: false,
    spicy: false,
    pescatarian: false,
    portionWeight: '',
    price: '',
    ingredients: [],
  },
  Ingredients: [],
  selectedIngredientsMap: new Map(),
  isEditing: false,
};
