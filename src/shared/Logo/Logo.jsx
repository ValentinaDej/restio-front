import PropTypes from 'prop-types';
import logo from 'assets/img/RESTio.svg';

const sizeValues = {
  sm: '54',
  md: '80',
  lg: '120',
};

export const Logo = ({ size = 'sm', classname }) => {
  return (
    <img
      className={`${classname}`}
      src={logo}
      alt="logo"
      width={sizeValues[size]}
      height={sizeValues[size]}
    />
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  classname: PropTypes.string,
};
