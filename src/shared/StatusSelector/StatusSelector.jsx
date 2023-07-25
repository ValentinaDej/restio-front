import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StatusSelector.module.scss';
import Status from '../Status/Status';

const StatusSelector = ({ mode }) => {
  const statusTables = ['free', 'taken', 'called waiter', 'request bill'];
  const statusDishes = ['ordered', 'in progress', 'ready', 'served'];
  const statusOrders = ['open', 'payed'];

  const [selectedCurrent, setSelectCurrent] = useState();
  const [currentMode, setCurrentMode] = useState([]);
  const [visibleBody, setVisibleBody] = useState(false);

  useEffect(() => {
    switch (mode) {
      case 'tables':
        setSelectCurrent(statusTables[0]);
        setCurrentMode(statusTables);
        break;
      case 'dishes':
        setSelectCurrent(statusDishes[0]);
        setCurrentMode(statusDishes);
        break;
      case 'orders':
        setSelectCurrent(statusOrders[0]);
        setCurrentMode(statusOrders);
        break;
      default:
        break;
    }
  }, []);

  const handleItemBody = (item) => {
    setSelectCurrent(item);
    setVisibleBody(false);
    //dispatch
  };
  return (
    <div>
      <div className={classes.select}>
        <div onClick={() => setVisibleBody(!visibleBody)} className={classes.select_header}>
          <div className={classes.select_current}>
            <Status statusCurrent={selectedCurrent} />
          </div>
          <div className={classes.select_icon}>&times;</div>
        </div>
        {visibleBody ? (
          <div className={classes.select_body}>
            <div>
              {currentMode &&
                currentMode.map((item, index) => {
                  console.log(item);
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
};

export default StatusSelector;
