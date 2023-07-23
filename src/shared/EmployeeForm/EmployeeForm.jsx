import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select/Select';
import styles from './EmployeeForm.module.scss';
import Button from '../Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input/Input';

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required field'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long.'
    ),
  gender: Yup.string().required('Required field'),
  role: Yup.string().required('Required field'),
  phone: Yup.string().min(10, 'Too Short!').max(15, 'Too Long!').required('Required field'),
  email: Yup.string().email('Invalid email').required('Required field'),
  address: Yup.string().required('Required field'),
  image: Yup.string(),
});

const EmployeeForm = ({ onSubmit, initialState, buttonText, size }) => {
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form
      className={`${styles.employeeForm} ${styles[`employeeForm_${size}`]}`}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.field__container}>
        <Input
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="First Name"
          size={size}
          length={'lg'}
        />

        {formik.touched.firstName && formik.errors.firstName ? (
          <div className={styles.error}>{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
          size={size}
          length={'lg'}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className={styles.error}>{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Select
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Gender"
          size={size}
          length={`lg`}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>

        {formik.touched.gender && formik.errors.gender ? (
          <div className={styles.error}>{formik.errors.gender}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Select
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Role"
          size={size}
          length={`lg`}
        >
          <option value="waiter">Waiter</option>
          <option value="admin">Admin</option>
          <option value="cook">Cook</option>
        </Select>

        {formik.touched.role && formik.errors.role ? (
          <div className={styles.error}>{formik.errors.role}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          size={size}
          length={`lg`}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}> {formik.errors.password}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone"
          size={size}
          length={`lg`}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className={styles.error}>{formik.errors.phone}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          size={size}
          length={`lg`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Address"
          size={size}
          length={`lg`}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className={styles.error}>{formik.errors.address}</div>
        ) : null}
      </div>
      <div className={styles.field__container}>
        <Input
          label={'Upload Photo'}
          size={size}
          length={`lg`}
          type="file"
          name="picture"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.btn_group}>
        <Button type="submit" size={size}>
          {buttonText}
        </Button>
        <Button type={'button'} onClick={formik.handleReset} size={size}>
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
    image: PropTypes.string,
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
    image: '',
  },
  buttonText: 'Submit',
  size: 'sm',
};

export default EmployeeForm;
