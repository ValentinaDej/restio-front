import PropTypes from 'prop-types';
import classes from './EmptyCard.module.scss';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { Text } from 'shared';

export const EmptyCard = ({ text, onClick, mode = 'primary', ...props }) => {
  return (
    <>
      <div onClick={onClick} className={`${classes.emptyCard_wrapper} ${classes[`${mode}`]}`}>
        <AiOutlineAppstoreAdd size={'2rem'} className={classes.icon} />
        <Text color={'var(--color-orange)'}>Add new {text}</Text>
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
