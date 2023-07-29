import PropTypes from 'prop-types';
import classes from './Button.module.scss';
import { memo } from 'react';

const Button = memo(({ children, type, onClick, mode, size, ...props }) => {
  const buttonMode = mode || 'primary';
  const buttonSize = size || 'md';

  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${classes[`button_${buttonMode}`]} ${
        classes[`button_${buttonSize}`]
      }`}
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
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};

export default Button;
