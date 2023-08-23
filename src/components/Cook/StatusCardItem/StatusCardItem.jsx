import PropTypes from 'prop-types';

import { DishesList } from '../DishesList/DishesList';
import styles from './StatusCardItem.module.scss';

export const StatusCardItem = ({ data, handleChangeStatus }) => {
  return (
    <div className={`${styles.status__card}`}>
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
      create: PropTypes.string.isRequired,
      orderNumber: PropTypes.string.isRequired,
      tableNumber: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};
