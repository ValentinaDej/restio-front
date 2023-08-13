import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import InputValid from 'shared/InputValid/InputValid';
import FileUploader from 'shared/FileUploader/FileUploader';
import DishTypeOptions from './DishTypeOptions/DishTypeOptions';
import SelectIngridientSection from './SelectIngridientSection/SelectIngridientSection';
import SelectedIngridientsSection from './SelectedIngridientsSection/SelectedIngridientsSection';

import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

import classes from './DishForm.module.scss';

const DishForm = ({ onSubmit, category, ingridients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState(new Map());

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
    defaultValues: {
      ingredients: [],
    },
  });

  const fileUploaderRef = useRef();

  const cleareForm = () => {
    reset();
  };

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const selectedIngredientIds = Array.from(selectedIngredients.keys());
    const picture = await fileUploaderRef.current.handleUpload();

    if (picture) {
      onSubmit({ ...data, picture: picture.data.imageName, ingredients: selectedIngredientIds });
    } else {
      onSubmit({ ...data, picture: '' });
    }
    reset();

    fileUploaderRef.current.clearFile();
  };

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
    <div className={classes.wrapper}>
      <div className={classes.form}>
        {/* <Title mode="h3">Create dish</Title> */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputValid
            name="name"
            placeholder="Dish name"
            autoComplete="off"
            size="sm"
            error={errors.name}
            validationRules={{
              required: 'Name is a required field',
              pattern: {
                value: /^[a-zA-Zа-яА-Я0-9\s]{3,50}$/,
                message: 'Invalid name',
              },
            }}
            register={register}
          />
          <div>
            <CheckBox label="Active" name="isActive" register={register} />
          </div>
          <div className={classes.column__wrapper}>
            <div className={classes.column}>
              <div className={classes.img__wrapper}>
                <FileUploader ref={fileUploaderRef} />
              </div>
              <DishTypeOptions register={register} />
            </div>
            <div className={classes.column}>
              <Select
                name="type"
                defaultValue=""
                register={register}
                size="sm"
                rules={{
                  required: 'Dish type is required',
                }}
              >
                <option value="" disabled hidden style={{ color: 'var(--color-danger)' }}>
                  Select dish type
                </option>
                {category.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              {errors.type && (
                <Text
                  mode="p"
                  textAlign="left"
                  fontSize={8}
                  fontWeight={400}
                  color="var(--color-gray)"
                >
                  {errors.type.message}
                </Text>
              )}
              <div className={classes.row__wrapper}>
                <div className={classes.rowfield__wrapper}>
                  <div className={classes.input__wrapper}>
                    <InputValid
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
                          message: 'Dish weight must be a number between 1 and 10000',
                        },
                      }}
                      register={register}
                    />
                  </div>
                </div>
                <div className={classes.rowfield__wrapper}>
                  <div className={classes.input__wrapper}>
                    <InputValid
                      name="price"
                      placeholder="Price"
                      autoComplete="Weight (gram)"
                      size="sm"
                      icon={FaMoneyBillAlt}
                      error={errors.price}
                      validationRules={{
                        required: 'Dish price is a required field',
                        pattern: {
                          value: /^[1-9]\d{0,3}$|^10000$/,
                          message:
                            'Dish price must be a positive number with up to 2 decimal places',
                        },
                      }}
                      register={register}
                    />
                  </div>
                </div>
              </div>
              <SelectIngridientSection
                selectedType={selectedType}
                ingridientsTypes={ingridientsTypes}
                handleTypeChange={handleTypeChange}
                handleInputChange={handleInputChange}
                handleInputKeyDown={handleInputKeyDown}
                inputValue={inputValue}
                ingridientsToShow={ingridientsToShow}
                selectedIngredients={selectedIngredients}
                firstIngredientRef={firstIngredientRef}
                handleToggleIngredient={handleToggleIngredient}
              />
            </div>
          </div>
          <SelectedIngridientsSection
            selectedIngredients={selectedIngredients}
            moveIngredient={moveIngredient}
          />
          <div className={classes.button__wrapper}>
            <Button type="submit" size="sm">
              Create
            </Button>
            <Button type="button" onClick={cleareForm} size="sm">
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

DishForm.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    vegetarian: PropTypes.bool,
    spicy: PropTypes.bool,
    pescatarian: PropTypes.bool,
    portionWeigh: PropTypes.number,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  buttonText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

DishForm.defaultProps = {
  initialState: {
    name: '',
    type: '',
    vegetarian: false,
    spicy: false,
    pescatarian: false,
    portionWeigh: 0,
    price: 0,
    ingredients: [],
  },
  size: 'sm',
};

export default DishForm;
