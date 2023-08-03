import PropTypes from 'prop-types';
import classes from './EmployeeCard.module.scss';
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const EmployeeCard = ({ children, onClick, mode = 'primary', size, src, alt, ...props }) => {
  return (
    <>
      <div className={`${classes.card} ${classes[`${mode}`]} ${classes[`${size}`]}`}>
        <img src={src} alt={alt} className={classes.card_image} />
        {/* Insert 'DELETE BUTTON" and "EDIT BUTTON" component instead of react-icons, but keep a class '.trash' and '.edit' and size={'1.2rem'}  */}
        <BsTrash
          onClick={() => {
            console.log(props.data);
          }}
          size={'1.6rem'}
          className={`${classes.trash} ${classes[`${size}`]}`}
        ></BsTrash>
        <BiEditAlt
          onClick={onClick}
          size={'1.6rem'}
          className={`${classes.edit} ${classes[`${size}`]}`}
        ></BiEditAlt>
        {/* End of buttons block  */}
        <div className={classes.employee_text}>{children}</div>
      </div>
    </>
  );
};

EmployeeCard.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['primary', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md']),
  onClick: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default EmployeeCard;
