import classes from './EmployeeCard.module.scss';
import { BsTrash } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

const DUMMY_EMPLOYEES = [
  {
    id: 'e1',
    name: 'Viktor',
    role: 'Waiter',
    phone: '+38 096 123 45 78',
    picture:
      'data:image/jpeg;base64,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',
  },
  {
    id: 'e2',
    name: 'Olena',
    role: 'Cook',
    phone: '+38 096 123 45 78',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc80vZ3u18R3E_2KFKL-hyh2e0-eZvnY2fL_OCRrZ0lYxzR9oS6bKTIrKNOeOlkb2xh3A&usqp=CAU',
  },
  {
    id: 'e3',
    name: 'Vasyl',
    role: 'Cook',
    phone: '+38 096 123 45 78',
    picture:
      'https://doximity-res.cloudinary.com/images/f_auto,q_auto,t_profile_photo_320x320/n5focrqidgaz4i9kj1w0/dennis-brown-md-centerville-oh.jpg',
  },
  {
    id: 'e4',
    name: 'Alina',
    role: 'Waiter',
    phone: '+38 096 123 45 78',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pbc3H9yYgdymFpJ5frN32l13IYwYSocmDA&usqp=CAU',
  },
];

const EmployeeCard = ({ children, type, onClick, mode = 'primary', size = 'md', ...props }) => {
  return (
    <>
      <div className={`${classes.card} ${classes[`${mode}`]} ${classes[`${size}`]}`}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pbc3H9yYgdymFpJ5frN32l13IYwYSocmDA&usqp=CAU"
          className={classes.card_image}
        />
        {/* Insert 'DELETE BUTTON" and "EDIT BUTTON" component instead of react-icons, but keep a class '.trash' and '.edit' and size={'1.2rem'}  */}
        <BsTrash size={'1.2rem'} className={classes.trash}></BsTrash>
        <BiEditAlt size={'1.2rem'} className={classes.edit}></BiEditAlt>
        {/* End of buttons block  */}
        <div className={classes.employee_text}>
          <p className={classes.employee_name}>Name</p>
          <p className={classes.employee_subinfo}>Role</p>
          <p className={classes.employee_subinfo}>+38 096 123 56 57</p>
        </div>
      </div>
    </>
  );
};

export default EmployeeCard;
