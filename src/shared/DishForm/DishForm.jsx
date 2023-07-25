import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Button from 'shared/Button/Button';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import { IconButton } from 'shared/IconButton/IconButton';

import classes from './DishForm.module.scss';
import * as initialData from './InitialState';

const DishForm = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(initialData.ingredientsList);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onSubmit',
  });

  const handleRemoveIngredient = (ingredientId) => {
    // setSelectedIngredients((prevIngredients) => {
    //   const newIngredients = new Set(prevIngredients);
    //   newIngredients.delete(ingredientId);
    //   return newIngredients;
    // });
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((id) => id !== ingredientId)
    );
  };

  const handleIngredientChange = (event) => {
    const selectedOptionValues = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );
    // setSelectedIngredients(
    //   (prevIngredients) => new Set([...prevIngredients, ...selectedOptionValues])
    // );
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ...selectedOptionValues]);
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
    console.log(data);
    console.log(selectedIngredients);
    reset();
    setSelectedIngredients(new Set());
    setSelectedType('');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <Title mode="h2">Create dish</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.field__wrapper}>
            <Input
              label="Name"
              name="name"
              placeholder="input dish name"
              rules={{
                required: 'Dish name is required',
                minLength: {
                  value: 3,
                  message: 'Dish name must be at least 3 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Dish name cannot exceed 50 characters',
                },
                pattern: {
                  value: /^[a-zA-Zа-яА-Я0-9\s]+$/,
                  message: 'Dish name can only contain letters, numbers, and spaces',
                },
              }}
              length={'lg'}
              register={register}
            />
            {errors.name && (
              <Text
                mode="p"
                textAlign="center"
                fontSize={8}
                fontWeight={400}
                color="var(--color-danger)"
              >
                {errors.name.message}
              </Text>
            )}
          </div>
          <div className={classes.field__wrapper}>
            <Select
              label="Type"
              length={`lg`}
              name="type"
              defaultValue=""
              register={register}
              rules={{
                required: 'Dish type is required',
              }}
            >
              <option value="" disabled hidden style={{ color: 'var(--color-danger)' }}>
                select dish type
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
                textAlign="center"
                fontSize={8}
                fontWeight={400}
                color="var(--color-danger)"
              >
                {errors.type.message}
              </Text>
            )}
          </div>
          <div className={classes.field__wrapper}>
            <Text mode="p" textAlign="left" fontSize={16} fontWeight={600}>
              Options
            </Text>
            <div className={classes.checkbox__wrapper}>
              <Input
                type="checkbox"
                label="vegetarian"
                name="vegetarian"
                register={register}
                size={'sm'}
              />
              <Input type="checkbox" label="spicy" name="spicy" register={register} size={'sm'} />
              <Input
                type="checkbox"
                label="pescatarian"
                name="pescatarian"
                register={register}
                size={'sm'}
              />
            </div>
          </div>
          <div className={classes.field__wrapper}>
            <Input
              type="number"
              label="Portion weight"
              name="portionWeight"
              placeholder="input weight in grams"
              rules={{
                required: 'Dish weight is required',
                pattern: {
                  value: /^[1-9]\d{0,3}$|^10000$/,
                  message: 'Dish weight must be a number between 1 and 10000',
                },
              }}
              length={'lg'}
              register={register}
            />
            {errors.portionWeight && (
              <Text
                mode="p"
                textAlign="center"
                fontSize={8}
                fontWeight={400}
                color="var(--color-danger)"
              >
                {errors.portionWeight.message}
              </Text>
            )}
          </div>
          <div className={classes.field__wrapper}>
            <Input
              type="text"
              label="Price"
              name="price"
              placeholder="input price"
              rules={{
                required: 'Dish price is required',
                pattern: {
                  value: /^(?!0\d)\d+(\.\d{1,2})?$/,
                  message: 'Dish price must be a positive number with up to 2 decimal places',
                },
              }}
              length={'lg'}
              register={register}
            />
            {errors.price && (
              <Text
                mode="p"
                textAlign="center"
                fontSize={8}
                fontWeight={400}
                color="var(--color-danger)"
              >
                {errors.price.message}
              </Text>
            )}
          </div>

          <div className={classes.field__wrapper}>
            <label htmlFor="type">Select Ingredient Type:</label>
            <Select id="type" value={selectedType} onChange={handleTypeChange}>
              <option value="">All</option>
              {initialData.typesOfIngredients.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className={classes.field__wrapper}>
            <Select
              label="Ingredients"
              name="Ingredients"
              multiple={true}
              onChange={handleIngredientChange}
              value={selectedIngredients}
              //value={Array.from(selectedIngredients)}
            >
              {filteredIngredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </Select>
          </div>

          <>
            <div>
              <label>Selected Ingredients:</label>
              <ul>
                {Array.from(selectedIngredients).map((ingredientId) => {
                  const ingredient = initialData.ingredientsList.find(
                    (ing) => ing.id === ingredientId
                  );
                  return (
                    <li key={ingredientId}>
                      {ingredient ? ingredient.name : 'Unknown Ingredient'}
                      {/* <IconButton onClick={() => handleRemoveIngredient(ingredientId)}></IconButton> */}
                      <button onClick={() => handleRemoveIngredient(ingredientId)}>Remove</button>
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
          <div className={classes.btn_group}>
            <Button type="submit">Create</Button>
            <Button type="button" onClick={() => reset()}>
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
