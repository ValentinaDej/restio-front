import Button from 'shared/Button/Button';
import cls from './NavigateButtons.module.scss';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from 'shared/IconButton/IconButton';
import { BiDish, BiMoney } from 'react-icons/bi';

export const NavigateButtons = ({ params, isWaiter }) => {
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
      <Button size={'sm'} mode={'outlined'} onClick={navigateBack}>
        Back
      </Button>
      {isWaiter && (
        <div className={cls.waiterBtns}>
          <IconButton
            Svg={BiDish}
            mode={isWaiterDishesPage ? 'filled' : 'outlined'}
            onClick={() => navigate(`/${params.restId}/waiter/tables/${params.tableId}/dishes`)}
          />
          <IconButton
            Svg={BiMoney}
            mode={isWaiterPayPage ? 'filled' : 'outlined'}
            onClick={() => navigate(`/${params.restId}/waiter/tables/${params.tableId}/pay`)}
          />
          <Button size={'sm'} mode={'outlined'} onClick={navigateToTableMenu}>
            Create order for table
          </Button>
        </div>
      )}
    </div>
  );
};
