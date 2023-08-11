import DishesList from '../DishesList/DishesList';
import styles from './StatusCardItem.module.scss';
import PropTypes from 'prop-types';

const StatusCardItem = ({ data, handleChangeStatus }) => {
  return (
    <div className={`${styles.status__card}`}>
      {data?.length > 0 &&
        data.map(
          ({ table_id, orderItems }) =>
            orderItems.length > 0 && (
              <div key={table_id} className={`${styles.cardItem}`}>
                <div className={`${styles.cardItem__top}`}>
                  <p className={`${styles.cardItem__title}`}>Table # {table_id}</p>
                </div>
                <DishesList dishes={orderItems} handleChangeStatus={handleChangeStatus} />
              </div>
            )
        )}
    </div>
  );
};

StatusCardItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      table_id: PropTypes.string.isRequired,
      orderItems: PropTypes.array,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default StatusCardItem;
