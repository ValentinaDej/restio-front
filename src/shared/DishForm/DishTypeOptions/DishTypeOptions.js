import { CheckBox } from 'shared';

import classes from './DishTypeOptions.module.scss';

const DishTypeOptions = ({ register }) => {
  return (
    <div className={classes.checkbox__wrapper}>
      <CheckBox label="vegetarian" name="vegetarian" register={register} />
      <CheckBox label="spicy" name="spicy" register={register} />
      <CheckBox label="pescatarian" name="pescatarian" register={register} />
    </div>
  );
};

export default DishTypeOptions;
