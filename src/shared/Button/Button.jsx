import PropTypes from 'prop-types';
import classes from './Button.module.scss';
import { memo } from 'react';

export const Button = memo(({ children, type, onClick, mode, size, className, ...props }) => {
  const buttonMode = mode || 'primary';
  const buttonSize = size || 'md';

  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${className ? className : ''} ${
        classes[`button_${buttonMode}`]
      } ${classes[`button_${buttonSize}`]}`}
      onClick={onClick}
      disabled={mode === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
