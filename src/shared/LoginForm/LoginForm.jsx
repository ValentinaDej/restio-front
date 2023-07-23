import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'shared/Button/Button';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import FormInput from './FormInput';
import classes from './LoginForm.module.scss';

const CHECK_EMAIL_SCHEMA =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const CHECK_PASSWORD_SCHEMA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;

const LoginForm = () => {
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
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    reset();
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
            validationRules={{
              required: 'Email is a required field',
              pattern: {
                value: CHECK_EMAIL_SCHEMA,
                message: 'Invalid email address',
              },
            }}
            register={register}
            error={errors.email}
          />
          <FormInput
            placeholder="Password"
            name="password"
            type={passwordShown ? 'text' : 'password'}
            autoComplete="current-password"
            validationRules={{
              required: 'Password is a required field',
              pattern: {
                value: CHECK_PASSWORD_SCHEMA,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.',
              },
            }}
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
