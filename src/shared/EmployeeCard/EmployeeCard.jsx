import PropTypes from 'prop-types';
import classes from './EmployeeCard.module.scss';
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export const EmployeeCard = ({
  children,
  onClick,
  mode = 'primary',
  size,
  src,
  alt,
  handleDelete,
  handleEdit,
  type,
  className,
  ...props
}) => {
  return (
    <>
      <div className={`${classes.card} ${classes[`${mode}`]} ${classes[`${size}`]}`}>
        <img
          src={src}
          alt={alt}
          className={`${classes.card_image} ${className ? className : ''}`}
        />
        {/* Insert 'DELETE BUTTON" and "EDIT BUTTON" component instead of react-icons, but keep a class '.trash' and '.edit' and size={'1.2rem'}  */}

        {type === 'dish_true' && (
          <AiFillEyeInvisible
            onClick={handleDelete}
            size={'1.6rem'}
            className={`${classes.trash} ${classes[`${size}`]}`}
          ></AiFillEyeInvisible>
        )}
        {type === 'dish_false' && (
          <AiFillEye
            onClick={handleDelete}
            size={'1.6rem'}
            className={`${classes.trash} ${classes[`${size}`]}`}
          ></AiFillEye>
        )}
        {type === 'employee' && (
          <BsTrash
            onClick={handleDelete}
            size={'1.6rem'}
            className={`${classes.trash} ${classes[`${size}`]}`}
          ></BsTrash>
        )}
        <BiEditAlt
          onClick={handleEdit}
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
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
