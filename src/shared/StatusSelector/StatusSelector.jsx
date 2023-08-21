import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StatusSelector.module.scss';
import { Status } from 'shared';

export const StatusSelector = ({
  mode,
  currentStatus,
  size = 'sm',
  statusSize,
  changeStatusFunction = () => {},
  itemId,
}) => {
  const [selectedCurrent, setSelectCurrent] = useState(currentStatus);
  const [currentMode, setCurrentMode] = useState([]);
  const [visibleBody, setVisibleBody] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisibleBody(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentStatus) {
      setSelectCurrent(currentStatus);
    }
  }, [currentStatus]);

  useEffect(() => {
    switch (mode) {
      case 'tables':
        setCurrentMode(['Free', 'Taken']);
        break;
      case 'dishes':
        setCurrentMode(['Ordered', 'In progress', 'Ready', 'Served']);
        break;
      case 'orders':
        setCurrentMode(['Open', 'Paid', 'Closed']);
        break;
      default:
        break;
    }
  }, [mode]);

  const handleItemBody = async (item) => {
    setVisibleBody(false);
    const isResolved = await changeStatusFunction(item, itemId);
    if (isResolved === 'success') {
      setSelectCurrent(item);
    }
  };

  return (
    <div ref={dropdownRef}>
      <div className={classes.select}>
        <div
          onClick={() => setVisibleBody(!visibleBody)}
          className={`${classes.select_header} ${classes[`select_header_${size}`]}`}
        >
          <div className={classes.select_current}>
            <Status statusCurrent={selectedCurrent} statusSize={statusSize} />
          </div>
        </div>
        {visibleBody ? (
          <div className={`${classes.select_body} ${classes[`select_body_${size}`]}`}>
            <div>
              {currentMode &&
                currentMode.map((item, index) => {
                  return (
                    <div
                      onClick={() => handleItemBody(item)}
                      key={item}
                      className={classes.select_item}
                    >
                      <Status statusCurrent={item} statusSize={statusSize} />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

StatusSelector.propTypes = {
  mode: PropTypes.oneOf(['tables', 'dishes', 'orders']).isRequired,
  itemId: PropTypes.string,
};
