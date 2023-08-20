import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'shared';
import { BillInfo } from '../BillInfo/BillInfo';
import cls from './BillDownload.module.scss';

export const BillDownload = ({ orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { restId } = useParams();

  const onClickDownload = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <BillInfo
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          orders={orders}
          restId={restId}
        />
      )}
      <Button size={'sm'} onClick={onClickDownload} className={cls.btn} mode="outlined">
        Download bill
      </Button>
    </>
  );
};

BillDownload.propTypes = {
  isWaiter: PropTypes.bool,
};
