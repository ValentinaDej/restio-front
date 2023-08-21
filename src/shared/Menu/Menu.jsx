import PropTypes from 'prop-types';
import classes from './Menu.module.scss';

import { EmptyCard, Title } from 'shared';

export const Menu = ({ mode, title = 'Menu', ...props }) => {
  return (
    <>
      <Title>{title}</Title>
      <ul className={`${classes.menu_wrapper} ${classes[mode]}`}>
        <li className={classes.card_wrapper}>
          <EmptyCard></EmptyCard>
        </li>
      </ul>
    </>
  );
};

Menu.propTypes = {
  title: PropTypes.oneOf(['Menu', 'Employees']),
  mode: PropTypes.oneOf(['primary', 'outlined']),
};
