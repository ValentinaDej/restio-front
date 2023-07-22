import React from 'react';
import PropTypes from 'prop-types';
import classes from './Title.module.scss';

const Title = ({ mode, children, fontWeight, fontSize, color, textAlign }) => {
  switch (mode) {
    case 'h1':
      return (
        <p
          style={{
            fontWeight,
            fontSize,
            color,
            textAlign,
          }}
          className={classes.text}
        >
          {children}
        </p>
      );
    case 'h2':
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
    case 'h3':
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

Title.propTypes = {
  mode: PropTypes.oneOf(['paragra', 'span']),
  children: PropTypes.string,
  textAlign: PropTypes.oneOf(['start', 'end', 'center', 'left', 'right']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

Title.defaultProps = {
  mode: 'h2',
  children: 'Title...',
};

export default Title;
