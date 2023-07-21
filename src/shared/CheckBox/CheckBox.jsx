import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCheck } from 'react-icons/ai';
import cls from './CheckBox.module.scss';
import { nanoid } from '@reduxjs/toolkit';

export const CheckBox = ({ label, disabled, checked, onChange, className, size = 20 }) => {
  const inputClasses = `visually-hidden ${cls.checkBox}`;
  const labelClasses = `${cls.checkIcon} ${disabled && cls.disabled}`;
  const checkBoxId = nanoid();

  const handleChange = ({ target }) => {
    const { checked } = target;
    onChange(checked);
  };

  return (
    <div className={className}>
      <label htmlFor={checkBoxId} className={cls.label}>
        <input
          type="checkbox"
          id={checkBoxId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={inputClasses}
        />
        <AiOutlineCheck className={labelClasses} size={size} />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  size: 20,
};
