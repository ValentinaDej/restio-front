import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './ConfirmModal.module.scss';
import Button from '../Button/Button';
import IconConfirm from '../../assets/icons/confirmModal/confirm.png';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  const [isOpen, setIsOpen] = useState(true);

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
            deny
          </Button>
          <Button onClick={handleConfirm}>confirm</Button>
        </div>
      </div>
    )
  );
};

ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
