import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Select, Button, Input, FileUploader } from 'shared';
import styles from './EmployeeForm.module.scss';
import { CHECK_PASSWORD_SCHEMA, CHECK_PHONE_SCHEMA, CHECK_EMAIL_SCHEMA } from 'utils/constants';

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required field'),
  lastName: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required field'),
  password: Yup.string().matches(
    CHECK_PASSWORD_SCHEMA,
    'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
  ),
  gender: Yup.string().required('Required field'),
  role: Yup.string().required('Required field'),
  phone: Yup.string()
    .matches(CHECK_PHONE_SCHEMA, 'Incorrect phone number')
    .required('Required field'),
  email: Yup.string().matches(CHECK_EMAIL_SCHEMA, 'Invalid email').required('Required field'),
  address: Yup.string().required('Required field'),
  picture: Yup.string(),
});

export const EmployeeForm = ({ onSubmit, initialState, buttonText, size }) => {
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
  const [showPassword, setShowPassword] = useState(false);
  const { personId } = useParams();

  if (personId) {
    validationSchema.fields.password = Yup.string().matches(
      /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30})?$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
    );
  }

  if (!personId) {
    validationSchema.fields.password = Yup.string().matches(
      CHECK_PASSWORD_SCHEMA,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
    );
  }

  const handleFormSubmit = async (data) => {
    // Add the file upload response to the form data
    const picture = await fileUploaderRef.current.handleUpload();

    delete data.image;

    onSubmit({ ...data, picture: picture });

    fileUploaderRef.current.clearFile();
  };

  function handleClear() {
    reset({
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      email: '',
      address: '',
      role: '',
      gender: '',
    });
    fileUploaderRef.current.clearFile();
  }

  return (
    <>
      <form
        className={`${styles.employeeForm} ${styles[`fields_${size}`]}`}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={`${styles.fields} ${styles[`fields_${size}`]}`}>
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
          <div className={`${styles.field__wrapper}`}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className={styles.passwordFieldWrapper}>
                  <div className={styles.passwordInputWrapper}>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      size={size}
                      length={`lg`}
                    />
                    <span className={styles.showPassword}>
                      {showPassword ? (
                        <FiEyeOff onClick={() => setShowPassword(false)} />
                      ) : (
                        <FiEye onClick={() => setShowPassword(true)} />
                      )}
                    </span>
                  </div>
                  {errors.password && <div className={styles.error}>{errors.password}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.field__wrapper}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Phone (ex. +380971234567)"
                    size={size}
                    length={`lg`}
                  />
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
                  <Input {...field} type="text" placeholder="Email" size={size} length={`lg`} />
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
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    label="Gender"
                    size={size}
                    register={register}
                    error={errors.gender ? 'error' : 'noError'}
                    {...field} // Pass field to the Select component
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                  {errors.gender && <div className={styles.error}>{errors.gender}</div>}
                </>
              )}
            />
          </div>
          <div className={styles.field__wrapper}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    label="Role"
                    size={size}
                    register={register}
                    error={errors.gender ? 'error' : 'noError'}
                    {...field}
                  >
                    <option value="waiter">Waiter</option>
                    <option value="admin">Admin</option>
                    <option value="cook">Cook</option>
                  </Select>
                  {errors.role && <div className={styles.error}>{errors.role}</div>}
                </>
              )}
            />
          </div>
        </div>
        <div className={`${styles.field__wrapper} ${styles.fileUploader__wrapper}`}>
          <FileUploader onEditPhoto={initialState.picture} ref={fileUploaderRef} />
        </div>
        <div className={styles.btn_group}>
          <Button type="submit" size={size} disabled={isSubmitting}>
            {buttonText}
          </Button>
          <Button mode={'outlined'} type="button" onClick={handleClear} size={size}>
            Clear
          </Button>
        </div>
      </form>
    </>
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
    picture: PropTypes.string,
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
    picture: '',
  },
  buttonText: 'Submit',
  size: 'sm',
};
