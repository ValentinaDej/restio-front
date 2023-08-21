import PropTypes from 'prop-types';
import classes from './Text.module.scss';
import { memo } from 'react';

export const Text = memo(
  ({ mode, children, fontWeight, fontSize, color, textAlign, classname }) => {
    switch (mode) {
      case 'p':
        return (
          <p
            style={{
              fontWeight,
              fontSize,
              color,
              textAlign,
            }}
            className={`${classes.p} ${classname ? classname : ''}`}
          >
            {children}
          </p>
        );
      case 'span':
        return (
          <span
            style={{
              fontWeight,
              fontSize,
              color,
              textAlign,
            }}
            className={`${classes.span} ${classname}`}
          >
            {children}
          </span>
        );
      default:
        <p>{children}</p>;
    }
  }
);

Text.propTypes = {
  mode: PropTypes.oneOf(['p', 'span']),
  children: PropTypes.node,
  textAlign: PropTypes.oneOf(['start', 'end', 'center', 'left', 'right']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontSize: PropTypes.number,
  color: PropTypes.string,
  classname: PropTypes.string,
};

Text.defaultProps = {
  mode: 'p',
  children: 'Text...',
};
