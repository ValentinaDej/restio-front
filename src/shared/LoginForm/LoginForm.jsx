import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { CheckBox, Button } from 'shared';
import FormInput from './FormInput';
import classes from './LoginForm.module.scss';
import { loginUser } from 'store/auth/authSlice';
import { Loader } from 'shared';

const schema = yup.object({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
  password: yup.string().required('Please provide a password'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
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
        navigate(`/${res.payload.restaurantId}/admin/personnel`);
      } else if (res.payload.role === 'waiter') {
        navigate(`/${res.payload.restaurantId}/waiter/tables`);
      } else if (res.payload.role === 'cook') {
        navigate(`/${res.payload.restaurantId}/cook`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};
