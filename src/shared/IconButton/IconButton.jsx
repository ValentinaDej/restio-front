import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cls from './IconButton.module.scss';
import { classNames } from 'helpers/classNames';

export const IconButton = memo(({ Svg, size = 20, mode, disabled, onClick, ...props }) => {
  const mods = {
    [cls.disabled]: disabled,
  };

  return (
    <button
      className={classNames(cls.btn, mods, [cls[mode]])}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Svg size={size} className={cls.icon} />
    </button>
  );
});

IconButton.propTypes = {
  Svg: PropTypes.elementType.isRequired,
  size: PropTypes.number,
  mode: PropTypes.oneOf(['outlined']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  size: 20,
};
