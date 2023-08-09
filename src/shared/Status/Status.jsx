import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Status.module.scss';
import Text from '../Text/Text';

const Status = ({ statusCurrent, className, statusSize = 'sm' }) => {
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

      case 'Waiting':
      case 'Ready':
        setStatusColor('orange');
        break;

      case 'Closed':
      case 'Canceled':
        setStatusColor('#d15f50');
        break;

      case 'Ordered':
      case 'Open':
      case 'Active':
        setStatusColor('#EB966A');
        break;
    }
  }, [statusCurrent]);

  return (
    <div
      style={{
        background: `${statusColor}`,
      }}
      className={`${classes.status} ${className} ${classes[`status_${statusSize}`]}`}
    >
      <Text mode={'p'} fontSize={statusSize === 'sm' ? 10 : 13}>
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
    'Waiting',
    'Requested',
    'Request bill',
    'Ordered',
    'In progress',
    'Ready',
    'Served',
    'Open',
    'Paid',
    'Active',
    'Closed',
    'Canceled',
  ]),
  className: PropTypes.string,
};

export default Status;
