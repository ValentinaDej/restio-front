import Button from 'shared/Button/Button';
import cls from './NavigateButtons.module.scss';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigateButtons = ({ params, isWaiter }) => {
  const navigate = useNavigate();

  const navigateBack = useCallback(() => {
    if (isWaiter) {
      navigate(`/waiter/tables/${params.restId}`);
    } else {
      navigate(`/${params.restId}/${params.tableId}`);
    }
  }, [isWaiter, navigate, params]);

  const navigateToTableMenu = () => {
    navigate(`/${params.restId}/${params.tableId}`);
  };
  return (
    <div className={cls.navigateBtns}>
      <Button size={'sm'} mode={'outlined'} onClick={navigateBack}>
        Back
      </Button>
      {isWaiter && (
        <Button size={'sm'} mode={'outlined'} onClick={navigateToTableMenu}>
          Create order for table
        </Button>
      )}
    </div>
  );
};
