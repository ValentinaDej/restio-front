import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'shared/Button/Button';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';
import Text from 'shared/Text/Text';
import Title from 'shared/Title/Title';
import FormSelectaGroup from './FormSelectGroup/FormSelectGroup';
import InputValid from 'shared/InputValid/InputValid';
import FileUploader from 'shared/FileUploader/FileUploader';
import { createDish } from 'api/dish';

import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';

import classes from './DishForm.module.scss';
import * as initialData from './InitialState';

const DishForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(initialData.ingredientsList);

  const {
    register,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    handleSubmit,
    reset,
    control,
    setError,
    clearErrors,
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onBlur',
    defaultValues: {
      ingredients: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { restId } = useParams();
  const navigate = useNavigate();
  const fileUploaderRef = useRef();

  const cleareForm = () => {
    reset();
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
    const picture = await fileUploaderRef.current.handleUpload();
    //delete data.image;

    // if (picture) {
    //   onSubmit({ ...data, picture: picture.data.imageName });
    // } else {
    //   onSubmit({ ...data, picture: '' });
    // }
    // reset();

    console.log('Form Data:', { ...data, picture: picture.data.imageName });
    fileUploaderRef.current.clearFile();
    reset();
    setSelectedType('');
    createDish({ ...data, picture: picture.data.imageName }, restId);
    navigate(-1);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <Title mode="h3">Create dish</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input type="checkbox" label="Active" name="isActive" register={register} size={'sm'} />
          </div>
          <div className={classes.column__wrapper}>
            <div className={classes.column}>
              <div className={classes.img__wrapper}>
                <FileUploader ref={fileUploaderRef} />
              </div>
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
                  <InputValid
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
            <FormSelectaGroup
              selectedType={selectedType}
              handleTypeChange={handleTypeChange}
              filteredIngredients={filteredIngredients}
              control={control}
              fields={fields}
              append={append}
              remove={remove}
              setError={setError}
              error={errors}
              clearErrors={clearErrors}
              isSubmitted={isSubmitted}
              isSubmitSuccessful={isSubmitSuccessful}
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
