import PropTypes from 'prop-types';
import classes from './Title.module.scss';
import { memo } from 'react';

const Title = ({ mode, children, fontWeight, fontSize, color, textAlign, classname }) => {
  switch (mode) {
    case 'h1':
      return (
        <h1
          style={{
            fontWeight,
            fontSize,
            color,
            textAlign,
          }}
          className={`${classes.h1} ${classname}`}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          style={{
            fontWeight,
            fontSize,
            color,
            textAlign,
          }}
          className={`${classes.h1} ${classname}`}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          style={{
            fontWeight,
            fontSize,
            color,
            textAlign,
          }}
          className={`${classes.h1} ${classname}`}
        >
          {children}
        </h3>
      );
  }
};

Title.propTypes = {
  mode: PropTypes.oneOf(['h1', 'h2', 'h3']),
  children: PropTypes.string,
  textAlign: PropTypes.oneOf(['start', 'end', 'center', 'left', 'right']),
  fontWeight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  fontSize: PropTypes.number,
  color: PropTypes.string,
  classname: PropTypes.string,
};

Title.defaultProps = {
  mode: 'h2',
  children: 'Title...',
};

export default Title;
