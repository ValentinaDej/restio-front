import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useSSE } from 'react-hooks-sse';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TablesWaiterPage.module.scss';
import { classNames } from 'helpers/classNames';
import { Loader, Title, CheckBox, Text, IconButton } from 'shared';
import { TableCard, CheckboxTables } from 'components';
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
  const [isSmall, setIsSmall] = useState(true);

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

  const filteredTables = useMemo(
    () =>
      filterTables(
        tablesData,
        orders,
        isFavoriteTables,
        isFreeTables,
        isWaitingTables,
        isTakenTables,
        isTablesWithReadyDishes,
        isTablesWithAllPaidOrders
      ),
    [
      tablesData,
      orders,
      isFavoriteTables,
      isFreeTables,
      isWaitingTables,
      isTakenTables,
      isTablesWithReadyDishes,
      isTablesWithAllPaidOrders,
    ]
  );

  const sortedTables = useMemo(() => sortTables(filteredTables), [filteredTables]);

  const filterOrdersByTableId = (orders, table_id) =>
    orders?.filter((order) => order.table_id._id === table_id);

  const isMobile = useMediaQuery({
    query: '(max-width: 610px)',
  });

  const onClickMoreBtn = useCallback(() => {
    setIsSmall((prev) => !prev);
  }, []);

  const isLoading = isLoadingTables || isLoadingOrders;
  if (isLoading) {
    return <Loader size="lg" />;
  }

  const hasError = isErrorTables || isErrorOrders;
  if (hasError) {
    toast.error('Something went wrong!');
  }

  return (
    <div className={styles.tables}>
      <Title textAlign={'left'}>Tables board</Title>
      <hr className={styles.tables__divider} />
      <AnimatePresence>
        <motion.div
          layout
          transition={{
            opacity: { ease: 'linear' },
            layout: { duration: 0.2 },
          }}
          className={styles.tables__checkbox_container}
        >
          {isMobile ? (
            <>
              {isSmall && <Text fontSize={20}>Filters</Text>}
              <IconButton
                className={classNames(styles.btn, { [styles.isSmall]: isSmall })}
                size={28}
                onClick={onClickMoreBtn}
                Svg={BiChevronDown}
                mode={'filled'}
              />
              {!isSmall && (
                <CheckboxTables
                  setIsFavoriteTables={setIsFavoriteTables}
                  isFavoriteTables={isFavoriteTables}
                  setIsFreeTables={setIsFreeTables}
                  isFreeTables={isFreeTables}
                  setIsTakenTables={setIsTakenTables}
                  isTakenTables={isTakenTables}
                  setIsWaitinigTables={setIsWaitinigTables}
                  isWaitingTables={isWaitingTables}
                  setIsTablesWithReadyDishes={setIsTablesWithReadyDishes}
                  isTablesWithReadyDishes={isTablesWithReadyDishes}
                  setIsTablesWithAllPaidOrders={setIsTablesWithAllPaidOrders}
                  isTablesWithAllPaidOrders={isTablesWithAllPaidOrders}
                  size={25}
                />
              )}
            </>
          ) : (
            <CheckboxTables
              setIsFavoriteTables={setIsFavoriteTables}
              isFavoriteTables={isFavoriteTables}
              setIsFreeTables={setIsFreeTables}
              isFreeTables={isFreeTables}
              setIsTakenTables={setIsTakenTables}
              isTakenTables={isTakenTables}
              setIsWaitinigTables={setIsWaitinigTables}
              isWaitingTables={isWaitingTables}
              setIsTablesWithReadyDishes={setIsTablesWithReadyDishes}
              isTablesWithReadyDishes={isTablesWithReadyDishes}
              setIsTablesWithAllPaidOrders={setIsTablesWithAllPaidOrders}
              isTablesWithAllPaidOrders={isTablesWithAllPaidOrders}
              size={25}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div layout className={styles.tables__section}>
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
