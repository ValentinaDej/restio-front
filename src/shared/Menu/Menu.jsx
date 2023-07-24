import PropTypes from 'prop-types';
import classes from './Menu.module.scss';

const Menu = ({ children, mode, ...props }) => {
  return (
    <>
      <div className={`${classes.menu_wrapper} ${classes[mode]}`}>
        {/* Map of Dishes cards here */}
      </div>
    </>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['primary', 'outlined']),
};

export default Menu;
