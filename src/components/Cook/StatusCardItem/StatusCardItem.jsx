import Status from 'shared/Status/Status';
import DishesList from '../DishesList/DishesList';
import styles from './StatusCardItem.module.scss';

const StatusCardItem = ({ data, handleChangeStatus, status }) => {
  return (
    <div className={`${styles.status__card}`}>
      <Status statusCurrent={status} className={`${styles.status__title}`} />
      {data?.length > 0 && <DishesList dishes={data} handleChangeStatus={handleChangeStatus} />}
    </div>
  );
};

export default StatusCardItem;
