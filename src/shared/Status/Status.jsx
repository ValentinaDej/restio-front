import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Status.module.scss';
import Text from '../Text/Text';

const Status = ({ statusCurrent }) => {
  const [statusColor, setStatusColor] = useState('#50D1AA');

  useEffect(() => {
    switch (statusCurrent?.toLowerCase()) {
      case 'free':
      case 'served':
      case 'paid':
      case 'success':
        setStatusColor('#50D1AA');
        break;

      case 'in progress':
      case 'taken':
        setStatusColor('#9290FE');
        break;

      case 'called waiter':
      case 'ready':
        setStatusColor('orange');
        break;

      case 'request bill':
      case 'ordered':
      case 'open':
        setStatusColor('#EB966A');
        break;
    }
  }, [statusCurrent]);

  return (
    <div
      style={{
        background: `${statusColor}`,
      }}
      className={classes.status}
    >
      <Text mode={'p'} fontSize={10}>
        {statusCurrent}
      </Text>
    </div>
  );
};

Status.propTypes = {
  statusCurrent: PropTypes.oneOf([
    'free',
    'Success',
    'taken',
    'called waiter',
    'request bill',
    'ordered',
    'in progress',
    'ready',
    'served',
    'Open',
    'Paid',
  ]).isRequired,
};

export default Status;
