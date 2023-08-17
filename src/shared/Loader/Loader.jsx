import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import classes from './Loader.module.scss';

const sizeValues = {
  xs: '24',
  sm: '54',
  md: '80',
  lg: '96',
};

const Loader = ({ size = 'sm', color = '#ea6a12' }) => {
  return (
    <div className={` ${classes.loader}`}>
      <RotatingLines
        strokeColor={'var(--color-orange)'}
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
