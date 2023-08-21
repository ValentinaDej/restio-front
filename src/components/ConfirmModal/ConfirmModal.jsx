import React from 'react';
import PropTypes from 'prop-types';

import classes from './ConfirmModal.module.scss';
import IconConfirm from 'assets/icons/confirmModal/confirm.png';
import { Button, Modal, Text } from 'shared';

export const ConfirmModal = ({
  confirmButtonText,
  denyButtonText,
  message,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleDeny = () => {
    onCancel();
  };

  return (
    <Modal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
      <div className={`${classes.confirmModal}`}>
        <img className={`${classes.img} `} src={IconConfirm} alt="Icon confirm" />
        <Text className={`${classes.title} `} fontWeight={600} fontSize={18}>
          {message}
        </Text>
        <div className={`${classes.buttons}  `}>
          <Button onClick={handleDeny} mode={'outlined'}>
            {denyButtonText}
          </Button>
          <Button onClick={handleConfirm}>{confirmButtonText}</Button>
        </div>
      </div>
    </Modal>
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
