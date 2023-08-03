import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import FormSelectGroup from './FormSelectGroup/FormSelectGroup';
import FormInput from './FormInput/FormInput';

import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

import classes from './DishForm.module.scss';
import * as initialData from './InitialState';

const DishForm = () => {
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [selectedType, setSelectedType] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(initialData.ingredientsList);

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
      selectedIngredients: new Set(), // Початкове значення для selectedIngredients
    },
  });

  const cleareForm = () => {
    setSelectedIngredients(new Set());
    reset();
  };

  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => {
      const newIngredients = new Set(prevIngredients);
      newIngredients.delete(ingredientId);
      return newIngredients;
    });
  };

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredients((prevIngredients) => {
      if (prevIngredients.has(ingredientId)) {
        return prevIngredients;
      } else {
        const newIngredients = new Set(prevIngredients);
        newIngredients.add(ingredientId);
        return newIngredients;
      }
    });
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);

    if (!newType) {
      setFilteredIngredients(initialData.ingredientsList);
    } else {
      const filtered = initialData.ingredientsList.filter(
        (ingredient) => ingredient.type === newType
      );
      setFilteredIngredients(filtered);
    }
  };

  const onSubmit = async (data) => {
    const formDataWithIngredients = {
      ...data,
      selectedIngredients: Array.from(selectedIngredients),
    };
    console.log('Form Data:', formDataWithIngredients);
    reset();
    setSelectedIngredients(new Set());
    setSelectedType('');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <Title mode="h2">Create dish</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
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
          <div className={classes.column__wrapper}>
            <div className={classes.column}>
              <div className={classes.field__wrapper}>Picture</div>
            </div>
            <div className={classes.column}>
              <div className={classes.field__wrapper}>
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
                  {initialData.typesOfDishes.map((option) => (
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
              </div>
              <div className={classes.checkbox__wrapper}>
                <div>
                  <Input
                    type="checkbox"
                    label="vegetarian"
                    name="vegetarian"
                    register={register}
                    size={'sm'}
                  />
                </div>
                <div>
                  <Input
                    type="checkbox"
                    label="spicy"
                    name="spicy"
                    register={register}
                    size={'sm'}
                  />
                </div>
                <div>
                  <Input
                    type="checkbox"
                    label="pescatarian"
                    name="pescatarian"
                    autoComplete="off"
                    register={register}
                    size={'sm'}
                  />
                </div>
              </div>
              <div className={classes.field__wrapper}>
                <div className={classes.input__wrapper}>
                  <FormInput
                    name="portionWeight"
                    placeholder="Dish weight"
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

              <div className={classes.field__wrapper}>
                <div className={classes.input__wrapper}>
                  <FormInput
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
                        message: 'Dish price must be a positive number with up to 2 decimal places',
                      },
                    }}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.column__wrapper}>
            <FormSelectGroup
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              handleRemoveIngredient={handleRemoveIngredient}
              handleIngredientChange={handleIngredientChange}
              selectedType={selectedType}
              handleTypeChange={handleTypeChange}
              filteredIngredients={filteredIngredients}
              control={control}
            />
          </div>

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
