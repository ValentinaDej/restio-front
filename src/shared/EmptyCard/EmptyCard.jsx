import PropTypes from 'prop-types';
import classes from './EmptyCard.module.scss';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';

const EmptyCard = ({ children, text = 'employee', onClick, mode = 'primary', ...props }) => {
  return (
    <>
      <div className={`${classes.emptyCard_wrapper} ${classes[`${mode}`]}`}>
        <AiOutlineAppstoreAdd size={'2rem'} className={classes.icon} />
        <p>Add new {text}</p>
      </div>
    </>
  );
};

EmptyCard.propTypes = {
  children: PropTypes.node,
  text: PropTypes.oneOf(['employee', 'dish']),
  mode: PropTypes.oneOf(['primary', 'outlined']),
  onClick: PropTypes.func,
};

export default EmptyCard;
