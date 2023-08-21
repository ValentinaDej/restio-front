import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

import classes from './SelectIngredients.module.scss';

const SelectIngredients = ({ types, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSelectChange = (type) => {
    onChange(type);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${classes.customSelect}`} ref={selectRef}>
      <div className={classes.select__wrapper} onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.selectedValue}>{value || 'All'}</div>
        <div className={classes.icon}>
          <FaChevronDown />
        </div>
      </div>

      {isOpen && (
        <ul className={classes.optionsList}>
          {types.map((type) => (
            <li
              key={type}
              className={classes.option}
              onClick={() => {
                handleSelectChange(type);
              }}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SelectIngredients.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectIngredients;
