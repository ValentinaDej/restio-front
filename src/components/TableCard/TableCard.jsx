import styles from './TableCard.module.scss';
import StatusSelector from 'shared/StatusSelector/StatusSelector';

const TableCard = ({ restaurant_id, table_id, status, seats, orders }) => {
  console.log(orders);
  return (
    <div className={styles.table}>
      <StatusSelector mode="tables" status={status} />
      {/* <div>{restaurant_id}</div> */}
      {/* <div>{table_id}</div> */}
      <div>{status}</div>
      {/* <div>{seats}</div> */}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>{order._id}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableCard;
