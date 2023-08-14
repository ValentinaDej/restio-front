import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.scss';

const CustomSelect = ({ options, value, onChange, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (event) => {
    onChange(event.target.value);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.customSelect} ${styles[`customSelect_${size}`]}`}>
      <div className={styles.selectedValue} onClick={() => setIsOpen(!isOpen)}>
        {value}
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => {
                handleSelectChange(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export default CustomSelect;
