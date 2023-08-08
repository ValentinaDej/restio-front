import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StatusSelector.module.scss';
import Status from '../Status/Status';

const StatusSelector = ({ mode, currentStatus, changeStatusFunction = () => {}, itemId }) => {
  const [selectedCurrent, setSelectCurrent] = useState(currentStatus);
  const [currentMode, setCurrentMode] = useState([]);
  const [visibleBody, setVisibleBody] = useState(false);

  useEffect(() => {
    switch (mode) {
      case 'tables':
        setCurrentMode(['Free', 'Taken', 'Waiting']);
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

  const handleItemBody = (item) => {
    setSelectCurrent(item);
    setVisibleBody(false);
    changeStatusFunction(item, itemId); //function to handle status changing
  };

  return (
    <div>
      <div className={classes.select}>
        <div onClick={() => setVisibleBody(!visibleBody)} className={classes.select_header}>
          <div className={classes.select_current}>
            <Status statusCurrent={selectedCurrent} />
          </div>
        </div>
        {visibleBody ? (
          <div className={classes.select_body}>
            <div>
              {currentMode &&
                currentMode.map((item, index) => {
                  return (
                    <div
                      onClick={() => handleItemBody(item)}
                      key={item}
                      className={classes.select_item}
                    >
                      <Status statusCurrent={item} />
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

export default StatusSelector;
