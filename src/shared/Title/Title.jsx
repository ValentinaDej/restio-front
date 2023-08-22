import PropTypes from 'prop-types';
import classes from './Title.module.scss';

export const Title = ({ mode, children, fontWeight, fontSize, color, textAlign, classname }) => {
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
          className={`${classname ? classname : ''} ${classes.h1} `}
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
          className={`${classname ? classname : ''}  ${classes.h2}`}
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
          className={`${classname ? classname : ''}  ${classes.h3} `}
        >
          {children}
        </h3>
      );
  }
};

Title.propTypes = {
  mode: PropTypes.oneOf(['h1', 'h2', 'h3']),
  children: PropTypes.node,
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
