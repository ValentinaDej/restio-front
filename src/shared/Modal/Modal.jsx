import { IconButton } from 'shared/IconButton/IconButton';
import classes from './Modal.module.scss';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect } from 'react';
import { Portal } from 'shared/Portal/Portal';

const Modal = ({ children, setIsModalOpen, ...props }) => {
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
    <Portal>
      <div className={`${classes.backdrop}`} onClick={handleCloseBackdrop}>
        <div className={`${classes.modal}`}>
          <IconButton
            Svg={AiOutlineClose}
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default Modal;
