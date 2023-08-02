import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'shared/Button/Button';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import FormInput from './FormInput';
import classes from './LoginForm.module.scss';
import { CHECK_PASSWORD_SCHEMA } from 'utils/constants';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from 'store/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      CHECK_PASSWORD_SCHEMA,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
    )
    .required('Please provide a password'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onSubmit',
    resolver: async (data) => {
      try {
        await schema.validate(data, { abortEarly: false });
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

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginUser(data));
      reset();
      if (res.payload.role === 'admin') {
        navigate('/admin');
      } else if (res.payload.role === 'waiter') {
        navigate('/waiter/tables');
      } else if (res.payload.role === 'cook') {
        navigate('/cook');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <div className={classes.form__header}>Sign In</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="username"
            register={register}
            error={errors.email}
          />
          <FormInput
            placeholder="Password"
            name="password"
            type={passwordShown ? 'text' : 'password'}
            autoComplete="current-password"
            register={register}
            error={errors.password}
          />
          <CheckBox
            label="Show Password"
            className={classes.form__checkbox}
            onChange={togglePasswordVisibility}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
