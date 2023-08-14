import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.scss';

const CustomSelect = ({ types, value, onChange, size }) => {
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
          {types.map((type) => (
            <li
              key={type}
              className={styles.option}
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

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export default CustomSelect;
