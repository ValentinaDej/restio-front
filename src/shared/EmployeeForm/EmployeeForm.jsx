import PropTypes from 'prop-types';
import Select from '../Select/Select';
import styles from './EmployeeForm.module.scss';
import { useState } from 'react';
import Button from '../../components/Button/Button';

const EmployeeForm = ({ onSubmit, initialState, buttonText, size }) => {
  const [employee, setEmployee] = useState(initialState);

  const handleChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(employee);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setEmployee(initialState);
  };

  return (
    <form className={styles.employeeForm} onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="password"
        name="password"
        value={employee.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <Select name="gender" onChange={handleChange} label="Gender" size={size} length={size}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      <Select name="role" onChange={handleChange} label="Role" size={size} length={size}>
        <option value="waiter">Waiter</option>
        <option value="admin">Admin</option>
        <option value="cook">Cook</option>
      </Select>
      <input
        name="phone"
        value={employee.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="address"
        value={employee.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input type="file" name="picture" onChange={handleChange} />
      <div className={styles.btn_group}>
        <Button type="submit" size={size}>
          {buttonText}
        </Button>
        <Button type={'button'} onClick={handleClear} size={size}>
          Clear
        </Button>
      </div>
    </form>
  );
};

EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    gender: PropTypes.string,
    role: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

EmployeeForm.defaultProps = {
  initialState: {
    firstName: '',
    lastName: '',
    password: '',
    gender: '',
    role: '',
    phone: '',
    email: '',
    address: '',
  },
  buttonText: 'Submit',
  size: 'md',
};

export default EmployeeForm;
