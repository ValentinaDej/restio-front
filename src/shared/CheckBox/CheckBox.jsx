import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCheck } from 'react-icons/ai';
import cls from './CheckBox.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import { classNames } from 'helpers/classNames';

export const CheckBox = memo(
  ({ label, disabled, checked, onChange, className, size = 20, ...props }) => {
    const inputClasses = `visually-hidden ${cls.checkBox}`;
    const [checkBoxId] = useState(nanoid());

    const mods = {
      [cls.disabled]: disabled,
    };

    return (
      <div className={className}>
        <label htmlFor={checkBoxId} className={cls.label}>
          <input
            type="checkbox"
            id={checkBoxId}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          <AiOutlineCheck className={classNames(cls.checkIcon, mods, [])} size={size} />
          {label && <span>{label}</span>}
        </label>
      </div>
    );
  }
);

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
