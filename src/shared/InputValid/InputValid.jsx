import React from 'react';
import { Input, Text } from 'shared';

import classes from './InputValid.module.scss';

export const InputValid = ({
  placeholder,
  name,
  type,
  value,
  autoComplete,
  icon: IconComponent,
  validationRules,
  register,
  error,
  size,
  label,
  onKeyDown,
  maxLength,
}) => {
  const hasError = error !== undefined;

  return (
    <div className={classes.field__wrapper}>
      <div className={`${classes.input__wrapper} ${hasError ? classes.error : ''}`}>
        <Input
          {...(register ? register(name, validationRules) : {})}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          size={size}
          value={value}
          label={label}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          error={error}
        />
        {IconComponent && (
          <div className={classes.icon__wrapper}>
            <IconComponent />
          </div>
        )}
      </div>

      <div className={classes.eror__wrapper}>
        {error && (
          <Text
            mode="p"
            textAlign="left"
            fontSize={10}
            fontWeight={400}
            color="var(--color-secondary)"
          >
            {error.message}
          </Text>
        )}
      </div>
    </div>
  );
};
