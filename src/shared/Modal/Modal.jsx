import { IconButton } from 'shared/IconButton/IconButton';
import classes from './Modal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, handleClose }) => {
  return (
    <div className={`${classes.backdrop}`}>
      <div className={`${classes.modal}`}>
        <IconButton
          Svg={AiOutlineClose}
          onClick={handleClose}
          style={{ position: 'absolute', top: 0, right: 0 }}
        />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
