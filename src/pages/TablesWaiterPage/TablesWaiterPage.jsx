import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useSSE } from 'react-hooks-sse';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './TablesWaiterPage.module.scss';
import { Loader, Title, CheckBox } from 'shared';
import { TableCard } from 'components';
import { useGetTablesByRestaurantId } from 'api/table';
import { useGetOrdersByRestaurantId } from 'api/order';
import { getTablesData } from 'store/tables/tableSelector';
import { filterTables, sortTables } from 'helpers/filterSortTables';

const TablesWaiterPage = () => {
  const [isFavoriteTables, setIsFavoriteTables] = useState(false);
  const [isFreeTables, setIsFreeTables] = useState(false);
  const [isWaitingTables, setIsWaitinigTables] = useState(false);
  const [isTakenTables, setIsTakenTables] = useState(false);
  const [isTablesWithReadyDishes, setIsTablesWithReadyDishes] = useState(false);
  const [isTablesWithAllPaidOrders, setIsTablesWithAllPaidOrders] = useState(false);

  const { restId } = useParams();
  const updateTableStatusEvent = useSSE('table status');
  const dishReadyEvent = useSSE('dish is ready');
  const newOrderEvent = useSSE('new order');
  const updateOrderStatusEvent = useSSE('update order status');

  const {
    isLoading: isLoadingTables,
    isError: isErrorTables,
    refetch: refetchTables,
  } = useGetTablesByRestaurantId(restId);

  const { tablesData } = useSelector(getTablesData);

  useEffect(() => {
    if (updateTableStatusEvent || newOrderEvent) {
      refetchTables({ force: true });
    }
  }, [newOrderEvent, refetchTables, updateTableStatusEvent]);

  const {
    refetch: refetchOrders,
    data: ordersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useGetOrdersByRestaurantId(restId);

  useEffect(() => {
    if (dishReadyEvent || updateOrderStatusEvent || newOrderEvent) {
      refetchOrders({ force: true });
    }
  }, [dishReadyEvent, newOrderEvent, refetchOrders, updateOrderStatusEvent]);

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
