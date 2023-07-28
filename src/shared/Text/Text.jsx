import React from 'react';
import PropTypes from 'prop-types';
import classes from './Text.module.scss';

const Text = ({ mode, children, fontWeight, fontSize, color, textAlign }) => {
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
          className={classes.p}
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
          className={classes.span}
        >
          {children}
        </span>
      );
    default:
  }
};

Text.propTypes = {
  mode: PropTypes.oneOf(['p', 'span']),
  children: PropTypes.node,
  textAlign: PropTypes.oneOf(['start', 'end', 'center', 'left', 'right']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

Text.defaultProps = {
  mode: 'p',
  children: 'Text...',
};

export default Text;
