import { useGetTablesByRestaurantId, useGetOrdersByRestaurantId } from 'api/service';
import Loader from 'shared/Loader/Loader';
import Title from 'shared/Title/Title';
import styles from './TablesWaiterPage.module.scss';
import TableCard from 'components/TableCard/TableCard';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useSSE } from 'react-hooks-sse';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messages/messagesSlice';

import { CheckBox } from 'shared/CheckBox/CheckBox';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TablesWaiterPage = () => {
  const dispatch = useDispatch();

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
    data: tablesData,
    isLoading: isLoadingTables,
    isError: isErrorTables,
    error: errorTables,
    refetch: refetchTables,
  } = useGetTablesByRestaurantId(restId);

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
    error: errorOrders,
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

  // console.log(tablesData);
  // console.log(ordersData);

  const tables = tablesData?.data;
  const orders = ordersData?.data?.orders;

  const isLoading = isLoadingTables || isLoadingOrders;

  if (isLoading) {
    return <Loader size="lg" />;
  }

  const hasError = isErrorTables || isErrorOrders;

  if (hasError) {
    toast.error('Something went wrong!');
  }

  const filterOrdersByTableId = (orders, table_id) =>
    orders?.filter((order) => order.table_id._id === table_id);

  // const tablesWithReadyDishes = orders
  //   .filter((order) => order.orderItems.some((item) => item.status === 'Ready'))
  //   .map((order) => order.table_id._id);

  // const tableNumbers = tablesWithReadyDishes
  //   .map((tableId) => {
  //     const table = tables.find((table) => table._id === tableId);
  //     return table ? table.table_number : null;
  //   })
  //   .filter((tableNumber) => tableNumber !== null);

  // const uniqueTableNumbers = [...new Set(tableNumbers)].join(', ');

  const filterTables = () => {
    let tablesFiltered = tables.slice();

    if (isFreeTables) {
      tablesFiltered = tablesFiltered.filter((table) => table.status === 'Free');
    }
    if (isTakenTables) {
      tablesFiltered = tablesFiltered.filter((table) => table.status === 'Taken');
    }
    if (isWaitingTables) {
      tablesFiltered = tablesFiltered.filter((table) => table.status === 'Waiting');
    }
    if (isTablesWithReadyDishes) {
      tablesFiltered = tablesFiltered.filter((table) => {
        const ordersForTable = orders.filter((order) => order.table_id._id === table._id);

        const hasReadyDishes = ordersForTable.some((order) =>
          order.orderItems.some((item) => item.status === 'Ready')
        );

        return hasReadyDishes;
      });
    }
    if (isTablesWithAllPaidOrders) {
      tablesFiltered = tablesFiltered.filter((table) => {
        // Find orders for this table
        const ordersForTable = orders.filter((order) => order.table_id._id === table._id);

        // Check if all orders are in "Paid" status
        const allOrdersPaid =
          ordersForTable.length > 0 && ordersForTable.every((order) => order.status === 'Paid');

        return allOrdersPaid;
      });
    }
    return tablesFiltered;
  };

  const filteredTables = filterTables();

  return (
    <div className={styles.tables}>
      <Sidebar />
      <Title textAlign={'left'}>Tables board</Title>
      <hr className={styles.tables__divider} />
      <div className={styles.tables__checkbox_container}>
        <div className={styles.tables__checkbox_container_body}>
          <CheckBox
            label={'Free tables'}
            onChange={() => setIsFreeTables((prev) => !prev)}
            checked={isFreeTables}
            size={25}
          />
          <CheckBox
            label={'Taken tables'}
            onChange={() => setIsTakenTables((prev) => !prev)}
            checked={isTakenTables}
            size={25}
          />
          <CheckBox
            label={'Waiting tables'}
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
          {filteredTables.map((table) => (
            <TableCard
              key={table.table_number}
              table_number={table.table_number}
              restaurant_id={table.restaurant_id}
              seats={table.seats}
              status={table.status}
              table_id={table._id}
              orders={filterOrdersByTableId(orders, table._id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TablesWaiterPage;
