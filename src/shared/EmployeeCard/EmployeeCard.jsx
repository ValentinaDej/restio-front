import PropTypes from 'prop-types';
import classes from './EmployeeCard.module.scss';
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeCard = ({ children, onClick, mode = 'primary', size, ...props }) => {
  const navigate = useNavigate();
  const { restId } = useParams();
  const handleClick = () => {
    navigate(`/admin/${restId}/personnel/new/${props.data._id}`);
  };
  return (
    <>
      <div className={`${classes.card} ${classes[`${mode}`]} ${classes[`${size}`]}`}>
        <img
          alt={`Employee ${props.data.name}`}
          src={props.data.picture}
          className={classes.card_image}
        />
        {/* Insert 'DELETE BUTTON" and "EDIT BUTTON" component instead of react-icons, but keep a class '.trash' and '.edit' and size={'1.2rem'}  */}
        <BsTrash
          onClick={() => {
            console.log(props.data);
          }}
          size={'1.6rem'}
          className={`${classes.trash} ${classes[`${size}`]}`}
        ></BsTrash>
        <BiEditAlt
          onClick={handleClick}
          size={'1.6rem'}
          className={`${classes.edit} ${classes[`${size}`]}`}
        ></BiEditAlt>
        {/* End of buttons block  */}
        <div className={classes.employee_text}>
          <p className={classes.employee_name}>{props.data.name}</p>
          <p className={classes.employee_subinfo}>{props.data.role}</p>
          <p className={classes.employee_subinfo}>{props.data.phone}</p>
        </div>
      </div>
    </>
  );
};

EmployeeCard.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['primary', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md']),
  onClick: PropTypes.func,
};

export default EmployeeCard;
