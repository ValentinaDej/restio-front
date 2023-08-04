import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import classes from './Loader.module.scss';

const sizeValues = {
  xs: '17',
  sm: '54',
  md: '80',
  lg: '96',
};

const Loader = ({ size = 'sm' }) => {
  return (
    <div className={`${classes.loader}`}>
      <RotatingLines
        strokeColor="#ea6a12"
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
};

export default Loader;
