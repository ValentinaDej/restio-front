import classes from './Modal.module.scss';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect } from 'react';
import { Portal, IconButton } from 'shared';

export const Modal = ({ children, isModalOpen, setIsModalOpen, classname, ...props }) => {
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
    if (isModalOpen) {
      window.addEventListener('keydown', handleCloseEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleCloseEsc);
    };
  }, [isModalOpen, handleCloseEsc]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Portal>
      {isModalOpen && (
        <div className={`${classes.backdrop}`} onClick={handleCloseBackdrop}>
          <div className={`${classes.modal} ${classname}`}>
            <IconButton
              Svg={AiOutlineClose}
              onClick={handleClose}
              style={{ position: 'absolute', top: 5, right: 5 }}
            />
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  classname: PropTypes.string,
};
