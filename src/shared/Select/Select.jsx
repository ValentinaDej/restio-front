import PropTypes from 'prop-types';
import styles from './Select.module.scss';

const Select = ({ children, onChange, name, id, label, size, length, register, ...props }) => {
  return (
    <div className={`${styles.select_wrapper}`}>
      <label className={`${styles.label} ${styles[`label_${size}`]}`} htmlFor={id}>
        {label}
      </label>
      <select
        className={`${styles.select} ${styles[`select_${size}`]} ${
          styles[`select_length-${length}`]
        }`}
        id={id}
        name={name}
        defaultValue={'default'}
        onChange={onChange}
        {...register(label.toLowerCase())}
        {...props}
      >
        <option disabled={true} value="default">
          Select an option
        </option>
        {children}
      </select>
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  length: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Select;
