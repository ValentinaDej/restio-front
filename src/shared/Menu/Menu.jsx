import PropTypes from 'prop-types';
import classes from './Menu.module.scss';
// import EmployeeCard from 'shared/EmployeeCard/EmployeeCard';
// import DishCard from 'shared/DishCard/DishCard';
import Title from 'shared/Title/Title';

const Menu = ({ mode, title = 'Menu', ...props }) => {
  // const fetchedListForRender = []; keep it here for future fetched data and send it via props to Card while mapping
  return (
    <>
      <Title>{title}</Title>
      <ul className={`${classes.menu_wrapper} ${classes[mode]}`}>
        {/* {title === 'Menu'
          ? fetchedListForRender.map((item) => {
              return (
                <li className={classes.card_wrapper} key={item.id}>
                  <DishCard data={item}></DishCard>
                </li>
              );
            })
          : title === 'Employee'
          ? fetchedListForRender.map((item) => {
              return (
                <li className={classes.card_wrapper} key={item.id}>
                  <EmployeeCard data={item}></EmployeeCard>
                </li>
              );
            })
          : ''} */}
        <li className={classes.card_wrapper}>{/* Employee or Dish component here */}</li>
      </ul>
    </>
  );
};

Menu.propTypes = {
  title: PropTypes.oneOf(['Menu', 'Employees']),
  mode: PropTypes.oneOf(['primary', 'outlined']),
};

export default Menu;
