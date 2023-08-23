import PropTypes from 'prop-types';
import styles from './MainWrapper.module.scss';

export const MainWrapper = ({ classname, children }) => {
  return <main className={`${styles.background} ${classname}`}>{children}</main>;
};

MainWrapper.propTypes = {
  classname: PropTypes.string,
  children: PropTypes.node,
};
