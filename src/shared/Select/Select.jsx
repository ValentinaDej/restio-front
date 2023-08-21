import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

export const Select = forwardRef(
  (
    {
      children,
      onChange,
      name,
      id,
      label,
      size,
      length,
      register,
      rules,
      multiple,
      value,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${styles.select_wrapper} `}>
        <select
          ref={ref} // Use the ref passed from Controller
          className={`${styles.select} ${styles[`select_${size}`]} ${className ? className : ''} ${
            styles[`select_length-${length}`]
          } ${styles[`select_${error}`]}  `}
          id={id}
          name={name}
          multiple={multiple}
          value={value}
          onChange={onChange}
          {...(register && register(name, rules))}
          {...props}
        >
          <option value="" disabled>
            Choose a {label}
          </option>
          {children}
        </select>
      </div>
    );
  }
);

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  error: PropTypes.oneOf(['error', 'noError']),
};
