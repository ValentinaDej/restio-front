import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import classes from './Loader.module.scss';

const sizeValues = {
  xs: '24',
  sm: '54',
  md: '80',
  lg: '96',
};

export const Loader = ({ size = 'sm', color = 'var(--color-primary)', className }) => {
  return (
    <div className={`${classes.loader} ${className}`}>
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        width={sizeValues[size]}
        animationDuration="0.75"
        visible={true}
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xs']),
  className: PropTypes.string,
};
