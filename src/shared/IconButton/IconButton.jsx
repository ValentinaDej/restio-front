import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cls from './IconButton.module.scss';
import { classNames } from 'helpers/classNames';

export const IconButton = memo(
  ({ Svg, size = 20, mode = 'clear', disabled, onClick, color, className, ...props }) => {
    const mods = {
      [cls.disabled]: disabled,
    };

    return (
      <button
        className={classNames(cls.btn, mods, [className, cls[mode]])}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <Svg size={size} className={cls.icon} color={color} />
      </button>
    );
  }
);

IconButton.propTypes = {
  Svg: PropTypes.elementType.isRequired,
  size: PropTypes.number,
  mode: PropTypes.oneOf(['clear', 'filled', 'outlined']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  size: 20,
  mode: 'clear',
};
