import { TbMoodSearch } from 'react-icons/tb';
import { Button, Text, Title } from 'shared';

import cls from './EmptyListBox.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

export const EmptyListBox = ({ params, isWaiter }) => {
  const navigate = useNavigate();

  const navigateBack = useCallback(() => {
    if (isWaiter) {
      navigate(`/${params.restId}/waiter/tables`);
    } else {
      navigate(`/${params.restId}/${params.tableId}`);
    }
  }, [isWaiter, navigate, params]);

  return (
    <div className={cls.box}>
      <TbMoodSearch size={150} className={cls.icon} />
      <Title mode={'h3'} fontSize={20} classname={cls.text}>
        {isWaiter ? 'There are no orders at this table yet' : 'No orders found...'}
      </Title>
      {!isWaiter && <Text classname={cls.text}>Looks like you haven't made your order yet</Text>}
      <Button size={'sm'} onClick={navigateBack}>
        {isWaiter ? 'Back to tables' : 'Back to menu'}
      </Button>
    </div>
  );
};

EmptyListBox.propTypes = {
  isWaiter: PropTypes.bool,
  urlParams: PropTypes.object,
};
