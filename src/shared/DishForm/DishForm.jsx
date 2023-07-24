import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import Select from '../Select/Select';
import styles from './DishForm.module.scss';
import Button from '../Button/Button';
import * as Yup from 'yup';
import Input from '../Input/Input';
// import FileUploader from '../FileUploader/FileUploader';
// import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  portionWeigh: Yup.number().min(1, 'Too Short!').required('Required field'),
  price: Yup.number().min(1, 'Too Short!').required('Required field'),
  pescatarian: Yup.boolean().required('Required field'),
  spicy: Yup.boolean().required('Required field'),
  vegetarian: Yup.boolean().required('Required field'),
});

const DishForm = ({ onSubmit, initialState, buttonText, size }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialState,
    resolver: async (data) => {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        return {
          values: data,
          errors: {},
        };
      } catch (err) {
        const errors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        return {
          values: {},
          errors: errors,
        };
      }
    },
  });

  //const fileUploaderRef = useRef();

  const handleFormSubmit = async (data) => {
    // Add the file upload response to the form data
    //  const image = await fileUploaderRef.current.handleUpload();

    onSubmit({
      ...data,
      //    image: image.data.imageName
    });
    reset();

    // toast.success('Dish updated!');

    //fileUploaderRef.current.clearFile();
  };

  const typesOfDishes = [
    'Soup',
    'Salad',
    'Dessert',
    'Pizza',
    'Main Course',
    'Appetizer',
    'Pasta',
    'Seafood',
    'Steak',
    'Steak ',
    'Sushi',
    'Vegetarian',
  ];

  return (
    <form
      className={`${styles.dishForm} ${styles[`dishForm_${size}`]}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.field__wrapper}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="name" size={size} length={'lg'} />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Select label="Type" size={size} length={`lg`} register={register}>
          {typesOfDishes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        {errors.type && <div className={styles.error}>{errors.type}</div>}
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="vegetarian"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} type="checkbox" label="vegetarian" size={size} length={'lg'} />
              {errors.vegetarian && <div className={styles.error}>{errors.vegetarian}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="spicy"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} type="checkbox" label="spicy" size={size} length={'lg'} />
              {errors.spicy && <div className={styles.error}>{errors.spicy}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="pescatarian"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} type="checkbox" label="pescatarian" size={size} length={'lg'} />
              {errors.pescatarian && <div className={styles.error}>{errors.pescatarian}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="portionWeigh"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder="portionWeigh"
                type="number"
                size={size}
                length={'lg'}
              />
              {errors.portionWeigh && <div className={styles.error}>{errors.portionWeigh}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="price" size={size} type="number" length={'lg'} />
              {errors.price && <div className={styles.error}>{errors.price}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.btn_group}>
        <Button type="submit" size={size} disabled={isSubmitting}>
          {buttonText}
        </Button>
        <Button type="button" onClick={() => reset()} size={size}>
          Clear
        </Button>
      </div>
    </form>
  );
};

DishForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    name: PropTypes.string,
    portionWeigh: PropTypes.number,
    price: PropTypes.number,
    type: PropTypes.string,
    spicy: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
  }),
  buttonText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

DishForm.defaultProps = {
  initialState: {
    name: '',
    portionWeigh: '',
    price: '',
    spicy: '',
    vegetarian: '',
    pescatarian: '',
    type: '',
  },
  buttonText: 'Submit',
  size: 'sm',
};

export default DishForm;
