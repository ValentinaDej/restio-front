import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import Select from '../Select/Select';
import styles from './EmployeeForm.module.scss';
import Button from '../Button/Button';
import * as Yup from 'yup';
import Input from '../Input/Input';
import FileUploader from '../FileUploader/FileUploader';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
    ),
  gender: Yup.string().required('Required field'),
  role: Yup.string().required('Required field'),
  phone: Yup.string().min(10, 'Too Short!').max(15, 'Too Long!').required('Required field'),
  email: Yup.string().email('Invalid email').required('Required field'),
  address: Yup.string().required('Required field'),
  image: Yup.string(),
});

const EmployeeForm = ({ onSubmit, initialState, buttonText, size }) => {
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

  const fileUploaderRef = useRef();

  const handleFormSubmit = async (data) => {
    // Add the file upload response to the form data
    const image = await fileUploaderRef.current.handleUpload();

    onSubmit({ ...data, image: image.data.imageName });
    reset();

    toast.success('Employee updated!');

    fileUploaderRef.current.clearFile();
  };

  return (
    <form
      className={`${styles.employeeForm} ${styles[`employeeForm_${size}`]}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.field__wrapper}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="First Name" size={size} length={'lg'} />
              {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="Last Name" size={size} length={'lg'} />
              {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Select label="Gender" size={size} length={`lg`} register={register}>
          <option>Male</option>
          <option>Female</option>
        </Select>
        {errors.gender && <div className={styles.error}>{errors.gender}</div>}
      </div>
      <div className={styles.field__wrapper}>
        <Select label="Role" size={size} length={`lg`} register={register}>
          <option>Waiter</option>
          <option>Admin</option>
          <option>Cook</option>
        </Select>
        {errors.role && <div className={styles.error}>{errors.role}</div>}
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} type="password" placeholder="Password" size={size} length={`lg`} />
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="Phone" size={size} length={`lg`} />
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} type="email" placeholder="Email" size={size} length={`lg`} />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="Address" size={size} length={`lg`} />
              {errors.address && <div className={styles.error}>{errors.address}</div>}
            </>
          )}
        />
      </div>
      <div className={styles.field__wrapper}>
        <FileUploader ref={fileUploaderRef} />
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

EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    gender: PropTypes.string,
    role: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

EmployeeForm.defaultProps = {
  initialState: {
    firstName: '',
    lastName: '',
    password: '',
    gender: '',
    role: '',
    phone: '',
    email: '',
    address: '',
    image: '',
  },
  buttonText: 'Submit',
  size: 'sm',
};

export default EmployeeForm;
