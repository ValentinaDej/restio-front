import { IconButton } from 'shared/IconButton/IconButton';
import classes from './Modal.module.scss';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect } from 'react';

const Modal = ({ children, setIsModalOpen, classname, position, ...props }) => {
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleCloseEsc = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleCloseBackdrop = useCallback(
    (e) => {
      if (e.currentTarget === e.target) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseEsc);
    };
  });

  return (
    <div className={`${classes.backdrop}`} onClick={handleCloseBackdrop} style={{ position }}>
      <div className={`${classes.modal} ${classname}`}>
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

Modal.propTypes = {
  children: PropTypes.node,
  setIsModalOpen: PropTypes.func.isRequired,
  classname: PropTypes.string,
  position: PropTypes.string.isRequired,
};

export default Modal;
