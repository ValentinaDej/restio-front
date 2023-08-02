import PropTypes from 'prop-types';
import classes from './EmptyCard.module.scss';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Text from 'shared/Text/Text';
import { useNavigate, useParams } from 'react-router-dom';

const EmptyCard = ({ text, onClick, mode = 'primary', ...props }) => {
  const navigate = useNavigate();
  const { restId } = useParams();
  const handleClick = () => {
    navigate(`/admin/${restId}/personnel/new`);
  };

  return (
    <>
      <div onClick={handleClick} className={`${classes.emptyCard_wrapper} ${classes[`${mode}`]}`}>
        <AiOutlineAppstoreAdd size={'2rem'} className={classes.icon} />
        <Text color="#ea6512">Add new {text}</Text>
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
