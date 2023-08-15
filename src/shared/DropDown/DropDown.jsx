import { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import styles from './DropDown.module.scss';

export const DropDown = ({ options, onSelect, defaultValue, clear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (clear) {
      setSelectedOption(null);
    }
  }, [clear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles['custom-dropdown']}>
      <button className={styles['dropdown-toggle']} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : defaultValue}
        <MdKeyboardArrowDown className={styles['icon']} />
      </button>
      {isOpen && (
        <ul className={styles['dropdown-list']}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles['dropdown-item']}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
