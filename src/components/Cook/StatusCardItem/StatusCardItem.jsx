import Status from 'shared/Status/Status';
import DishesList from '../DishesList/DishesList';
import styles from './StatusCardItem.module.scss';
import PropTypes from 'prop-types';

const StatusCardItem = ({ data, handleChangeStatus, status }) => {
  return (
    <div className={`${styles.status__card}`}>
      <Status statusCurrent={status} className={`${styles.status__title}`} />
      {data?.length > 0 && <DishesList dishes={data} handleChangeStatus={handleChangeStatus} />}
    </div>
  );
};

StatusCardItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dish: PropTypes.object.isRequired,
      quantity: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      orderId: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusCardItem;
