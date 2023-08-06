import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Status.module.scss';
import Text from '../Text/Text';

const Status = ({ statusCurrent }) => {
  const [statusColor, setStatusColor] = useState('#50D1AA');

  useEffect(() => {
    switch (statusCurrent) {
      case 'Free':
      case 'Served':
      case 'Paid':
      case 'Success':
        setStatusColor('#50D1AA');
        break;

      case 'In progress':
      case 'Taken':
        setStatusColor('#9290FE');
        break;

      case 'Requested':
      case 'Ready':
        setStatusColor('orange');
        break;

      case 'Closed':
      case 'Canceled':
        setStatusColor('#d15f50');
        break;

      case 'Requested':
      case 'Ordered':
      case 'Open':
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
    'Free',
    'Success',
    'Taken',
    'Called waiter',
    'Request bill',
    'Ordered',
    'In progress',
    'Ready',
    'Served',
    'Open',
    'Paid',
    'Closed',
    'Canceled',
  ]),
};

export default Status;
