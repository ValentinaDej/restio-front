import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiDish, BiMoney, BiSolidPlusCircle } from 'react-icons/bi';

import cls from './NavigateButtons.module.scss';
import { Text, IconButton, Button, Tooltip } from 'shared';
import { Filters } from '../Filters/Filters';

export const NavigateButtons = ({
  params,
  isWaiter,
  notServedDishes,
  notPaidOrders,
  setSortOrderBy,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateBack = useCallback(() => {
    if (isWaiter) {
      navigate(`/${params.restId}/waiter/tables`);
    } else {
      navigate(`/${params.restId}/tables/${params.tableId}`);
    }
  }, [isWaiter, navigate, params]);

  const navigateToTableMenu = () => {
    navigate(`/${params.restId}/tables/${params.tableId}`);
  };

  const isWaiterPayPage = pathname.includes('pay');
  const isWaiterDishesPage = pathname.includes('dishes');

  return (
    <div className={cls.navigateBtns}>
      <div className={cls.leftBtns}>
        <Button size={'sm'} mode={'outlined'} onClick={navigateBack} className={cls.backBtn}>
          Back
        </Button>
        <Filters setSortOrderBy={setSortOrderBy} />
      </div>
      {isWaiter && (
        <div className={cls.waiterBtns}>
          <div className={cls.iconBtns}>
            <div className={cls.iconBtn}>
              <Tooltip content="Orders dishes">
                <IconButton
                  className={cls.icon}
                  Svg={BiDish}
                  mode={isWaiterDishesPage ? 'filled' : 'outlined'}
                  onClick={() =>
                    navigate(`/${params.restId}/waiter/tables/${params.tableId}/dishes`)
                  }
                />
              </Tooltip>
              {notServedDishes !== 0 && (
                <div className={cls.iconBtnBox}>
                  <Text
                    textAlign={'center'}
                    fontWeight={700}
                    fontSize={14}
                    classname={cls.iconBtnValue}
                  >
                    {notServedDishes}
                  </Text>
                </div>
              )}
            </div>
            <div className={cls.iconBtn}>
              <Tooltip content="Orders payments">
                <IconButton
                  className={cls.icon}
                  Svg={BiMoney}
                  mode={isWaiterPayPage ? 'filled' : 'outlined'}
                  onClick={() => navigate(`/${params.restId}/waiter/tables/${params.tableId}/pay`)}
                />
              </Tooltip>
              {notPaidOrders !== 0 && (
                <div className={cls.iconBtnBox}>
                  <Text
                    textAlign={'center'}
                    fontWeight={700}
                    fontSize={14}
                    classname={cls.iconBtnValue}
                  >
                    {notPaidOrders}
                  </Text>
                </div>
              )}
            </div>
            <Tooltip content="Create order">
              <IconButton
                className={cls.icon}
                Svg={BiSolidPlusCircle}
                onClick={navigateToTableMenu}
                mode={'outlined'}
              />
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};
