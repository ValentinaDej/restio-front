import React from 'react';
import classes from './LoginForm.module.scss';

const FormInput = ({ placeholder, name, type, autoComplete, validationRules, register, error }) => (
  <>
    <input
      {...register(name, validationRules)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
    {error && <p className={classes.form__error}>{error.message}</p>}
  </>
);

export default FormInput;
