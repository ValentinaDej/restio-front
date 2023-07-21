import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './ConfirmModal.module.scss';
import Button from '../Button/Button';
import IconConfirm from '../../assets/icons/confirmModal/confirm.png';

const ConfirmModal = ({
  confirmButtonText,
  denyButtonText,
  message,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}) => {
  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleDeny = () => {
    setIsOpen(false);
    onCancel();
  };

  return (
    isOpen && (
      <div className={`${classes.confirmModal}`}>
        <img className={`${classes.img} `} src={IconConfirm} alt="Icon confirm" />
        <div className={`${classes.title} `}>{message}</div>
        <div className={`${classes.buttons}  `}>
          <Button onClick={handleDeny} mode={'outlined'}>
            {denyButtonText}
          </Button>
          <Button onClick={handleConfirm}>{confirmButtonText}</Button>
        </div>
      </div>
    )
  );
};

ConfirmModal.propTypes = {
  confirmButtonText: PropTypes.string.isRequired,
  denyButtonText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  confirmButtonText: 'Confirm',
  denyButtonText: 'Deny',
  message: 'confirm your actions',
};

export default ConfirmModal;
