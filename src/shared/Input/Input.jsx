import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      id,
      type,
      name,
      value,
      onChange,
      placeholder,
      pattern,
      inputRef,
      size,
      length,
      mode,
      register,
      rules,
      isFullWidth,
      error,
      onKeyDown,
      maxLength,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    return (
      <div className={styles.input_wrapper}>
        <label
          className={`${styles.label} ${styles[`label_${size}`]} 
          }`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          ref={ref}
          {...(register && register(name, rules))}
          type={type || 'text'}
          id={id}
          name={name}
          value={value}
          pattern={pattern}
          placeholder={placeholder}
          className={`${styles.input} ${styles[`input_${size}`]} ${
            styles[`input_length-${length}`]
          } ${hasError ? styles.input_error : ''}`}
          onChange={onChange}
          disabled={mode === 'disabled'}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          {...props}
        />
      </div>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'search', 'checkbox']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
  mode: PropTypes.string,
};
