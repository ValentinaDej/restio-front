import React from 'react';
import Input from 'shared/Input/Input';
import Text from 'shared/Text/Text';

import classes from './InputValid.module.scss';

const InputValid = ({
  placeholder,
  name,
  type,
  autoComplete,
  icon: IconComponent,
  validationRules,
  register,
  error,
  size,
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
        />
        {IconComponent && (
          <div className={classes.icon__wrapper}>
            <IconComponent />
          </div>
        )}
      </div>

      <div className={classes.eror__wrapper}>
        {error && (
          <Text mode="p" textAlign="left" fontSize={10} fontWeight={400} color="var(--color-gray)">
            {error.message}
          </Text>
        )}
      </div>
    </div>
  );
};

export default InputValid;
