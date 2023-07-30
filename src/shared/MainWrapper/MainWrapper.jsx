import PropTypes from 'prop-types';
import styles from './MainWrapper.module.scss';

const MainWrapper = ({ classname, children }) => {
  return <div className={`${styles.background} ${classname}`}>{children}</div>;
};

MainWrapper.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node,
};

export default MainWrapper;
