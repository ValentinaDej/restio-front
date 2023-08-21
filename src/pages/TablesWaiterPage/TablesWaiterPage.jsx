import { useGetTablesByRestaurantId } from 'api/table';
import { useGetOrdersByRestaurantId } from 'api/order';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/Loader/Loader';
import Title from 'shared/Title/Title';
import styles from './TablesWaiterPage.module.scss';
import TableCard from 'components/TableCard/TableCard';
import { toast } from 'react-hot-toast';
import { getTablesData } from 'store/tables/tableSelector';
import { CheckBox } from 'shared/CheckBox/CheckBox';
import { motion, AnimatePresence } from 'framer-motion';
import { filterTables, sortTables } from '../../helpers/filterSortTables';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useSSE } from 'react-hooks-sse';
import { addMessage } from 'store/messages/messagesSlice';

const TablesWaiterPage = () => {
  const dispatch = useDispatch();

  const [isFavoriteTables, setIsFavoriteTables] = useState(false);
  const [isFreeTables, setIsFreeTables] = useState(false);
  const [isWaitingTables, setIsWaitinigTables] = useState(false);
  const [isTakenTables, setIsTakenTables] = useState(false);
  const [isTablesWithReadyDishes, setIsTablesWithReadyDishes] = useState(false);
  const [isTablesWithAllPaidOrders, setIsTablesWithAllPaidOrders] = useState(false);

  const { restId } = useParams();
  const updateTableStatusEvent = useSSE('table status', {});
  const dishReadyEvent = useSSE('dish is ready', {});
  const newOrderEvent = useSSE('new order', {});

  const {
    isLoading: isLoadingTables,
    isError: isErrorTables,
    refetch: refetchTables,
  } = useGetTablesByRestaurantId(restId);

  const { tablesData } = useSelector(getTablesData);

  useEffect(() => {
    if (updateTableStatusEvent && updateTableStatusEvent.message) {
      if (updateTableStatusEvent.message.includes('Waiting')) {
        dispatch(
          addMessage({
            message: updateTableStatusEvent.message,
            id: Date.now(),
            type: 'waiting',
          })
        );
      }
      refetchTables({ force: true });
    }
  }, [dispatch, refetchTables, restId, updateTableStatusEvent]);

  const {
    refetch: refetchOrders,
    data: ordersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useGetOrdersByRestaurantId(restId);

  useEffect(() => {
    if (dishReadyEvent && dishReadyEvent.message) {
      dispatch(addMessage({ message: dishReadyEvent.message, id: Date.now(), type: 'ready' }));

      refetchOrders({ force: true });
    }
  }, [dishReadyEvent, dispatch, refetchOrders]);

  useEffect(() => {
    if (newOrderEvent) {
      refetchTables({ force: true });
      refetchOrders({ force: true });
    }
  }, [newOrderEvent, refetchOrders, refetchTables]);

  const orders = ordersData?.data?.orders;

  const isLoading = isLoadingTables || isLoadingOrders;

  if (isLoading) {
    return <Loader size="lg" />;
  }

  const hasError = isErrorTables || isErrorOrders;

  if (hasError) {
    toast.error('Something went wrong!');
  }

  const filteredTables = filterTables(
    tablesData,
    orders,
    isFavoriteTables,
    isFreeTables,
    isWaitingTables,
    isTakenTables,
    isTablesWithReadyDishes,
    isTablesWithAllPaidOrders
  );

  const sortedTables = sortTables(filteredTables);

  const filterOrdersByTableId = (orders, table_id) =>
    orders?.filter((order) => order.table_id._id === table_id);

  return (
    <div className={styles.tables}>
      <Sidebar />
      <Title textAlign={'left'}>Tables board</Title>
      <hr className={styles.tables__divider} />
      <div className={styles.tables__checkbox_container}>
        <div className={styles.tables__checkbox_container_body}>
          <CheckBox
            label={'Favorite'}
            onChange={() => setIsFavoriteTables((prev) => !prev)}
            checked={isFavoriteTables}
            size={25}
          />
          <CheckBox
            label={'Free'}
            onChange={() => setIsFreeTables((prev) => !prev)}
            checked={isFreeTables}
            size={25}
          />
          <CheckBox
            label={'Taken'}
            onChange={() => setIsTakenTables((prev) => !prev)}
            checked={isTakenTables}
            size={25}
          />
          <CheckBox
            label={'Waiting'}
            onChange={() => setIsWaitinigTables((prev) => !prev)}
            checked={isWaitingTables}
            size={25}
          />
          <CheckBox
            label={'Ready dishes'}
            onChange={() => setIsTablesWithReadyDishes((prev) => !prev)}
            checked={isTablesWithReadyDishes}
            size={25}
          />
          <CheckBox
            label={'All orders paid'}
            onChange={() => setIsTablesWithAllPaidOrders((prev) => !prev)}
            checked={isTablesWithAllPaidOrders}
            size={25}
          />
        </div>
      </div>
      <AnimatePresence>
        <motion.div layout className={styles.tables__container}>
          {sortedTables.map((table) => (
            <TableCard
              key={table.table_number}
              table_number={table.table_number}
              restaurant_id={table.restaurant_id}
              seats={table.seats}
              status={table.status}
              table_id={table._id}
              orders={filterOrdersByTableId(orders, table._id)}
              isFavorite={table.isFavorite === undefined ? false : table.isFavorite}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TablesWaiterPage;
