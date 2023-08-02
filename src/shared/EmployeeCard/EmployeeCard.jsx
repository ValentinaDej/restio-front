import PropTypes from 'prop-types';
import classes from './EmployeeCard.module.scss';
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const EmployeeCard = ({ children, onClick, mode = 'primary', size, ...props }) => {
  return (
    <>
      <div className={`${classes.card} ${classes[`${mode}`]} ${classes[`${size}`]}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pbc3H9yYgdymFpJ5frN32l13IYwYSocmDA&usqp=CAU"
          className={classes.card_image}
        />
        {/* Insert 'DELETE BUTTON" and "EDIT BUTTON" component instead of react-icons, but keep a class '.trash' and '.edit' and size={'1.2rem'}  */}
        <BsTrash size={'1.2rem'} className={`${classes.trash} ${classes[`${size}`]}`}></BsTrash>
        <BiEditAlt size={'1.2rem'} className={`${classes.edit} ${classes[`${size}`]}`}></BiEditAlt>
        {/* End of buttons block  */}
        <div className={classes.employee_text}>
          <p className={classes.employee_name}>name</p>
          <p className={classes.employee_subinfo}>role</p>
          <p className={classes.employee_subinfo}>phone</p>
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
