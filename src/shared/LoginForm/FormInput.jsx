import React from 'react';
import classes from './LoginForm.module.scss';

const FormInput = ({ placeholder, name, type, autoComplete, register, error }) => (
  <>
    <input {...register(name)} type={type} placeholder={placeholder} autoComplete={autoComplete} />
    {error && <p className={classes.form__error}>{error}</p>}
  </>
);

export default FormInput;
