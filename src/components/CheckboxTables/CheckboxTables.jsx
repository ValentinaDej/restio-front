import { CheckBox } from 'shared';
import styles from './CheckboxTables.module.scss';

export const CheckboxTables = ({
  setIsFavoriteTables,
  isFavoriteTables,
  setIsFreeTables,
  isFreeTables,
  setIsTakenTables,
  isTakenTables,
  setIsWaitinigTables,
  isWaitingTables,
  setIsTablesWithReadyDishes,
  isTablesWithReadyDishes,
  setIsTablesWithAllPaidOrders,
  isTablesWithAllPaidOrders,
  size = 25,
}) => {
  return (
    <div className={styles.checkbox}>
      <CheckBox
        label={'Favorite'}
        onChange={() => setIsFavoriteTables((prev) => !prev)}
        checked={isFavoriteTables}
        size={size}
      />
      <CheckBox
        label={'Free'}
        onChange={() => setIsFreeTables((prev) => !prev)}
        checked={isFreeTables}
        size={size}
      />
      <CheckBox
        label={'Taken'}
        onChange={() => setIsTakenTables((prev) => !prev)}
        checked={isTakenTables}
        size={size}
      />
      <CheckBox
        label={'Waiting'}
        onChange={() => setIsWaitinigTables((prev) => !prev)}
        checked={isWaitingTables}
        size={size}
      />
      <CheckBox
        label={'Ready dishes'}
        onChange={() => setIsTablesWithReadyDishes((prev) => !prev)}
        checked={isTablesWithReadyDishes}
        size={size}
      />
      <CheckBox
        label={'All orders paid'}
        onChange={() => setIsTablesWithAllPaidOrders((prev) => !prev)}
        checked={isTablesWithAllPaidOrders}
        size={size}
      />
    </div>
  );
};
