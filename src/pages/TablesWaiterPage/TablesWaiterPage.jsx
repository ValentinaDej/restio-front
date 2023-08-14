import {
  useGetTablesByRestaurantId,
  useGetOrdersByRestaurantId,
  getTablesFromRest,
} from 'api/service';
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
import { useQuery, useQueryClient } from 'react-query';

const dumbTables = [
  {
    table_number: '1',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Called waiter',
    _id: '64ce43064f5d2308d5e67258',
  },
  {
    table_number: '2',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Free',
    _id: '64c4f7db4055a7111092df12',
  },
  {
    table_number: '3',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Taken',
    _id: '64c4fe004055a7111092df34',
  },
  {
    table_number: '4',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Free',
    _id: '64c4f7db4055a7111092df12',
  },
  {
    table_number: '5',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Taken',
    _id: '64c4f7db4055a7111092df12',
  },
  {
    table_number: '6',
    restaurant_id: '64c4fdea4055a7111092df32',
    seats: '3',
    status: 'Free',
    _id: '64c4f7db4055a7111092df12',
  },
];

const TablesWaiterPage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { restId } = useParams();
  const updateTableStatusEvent = useSSE('table status', {});
  const dishReadyEvent = useSSE('dish is ready', {});
  console.log('Call Waiter SSE Event:', updateTableStatusEvent);
  console.log('Dish Event:', dishReadyEvent);
  // const {
  //   data: tablesData,
  //   isLoading: isLoadingTables,
  //   isError: isErrorTables,
  //   error: errorTables,
  // } = useGetTablesByRestaurantId(restId);

  const { data: tablesData, refetch } = useQuery(
    ['tables', restId],
    async () => await getTablesFromRest(restId),

    {
      // staleTime: 0, // Data is immediately considered stale and will be refetched on the next request
      // cacheTime: 0, // Data is never considered stale, and automatic refetching is disabled
      refetchOnWindowFocus: false, // Disable refetching when the window gains focus
      refetchOnReconnect: false, // Disable refetching when the network reconnects
      refetchInterval: false, // Disable automatic periodic refetching
    }
  );

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
      refetch({ force: true }).then(() => {
        console.log('refetch table status');
        // Invalidate the specific query key to force a refetch
        queryClient.invalidateQueries(['tables', restId]);
      });
    }
  }, [dispatch, queryClient, refetch, restId, updateTableStatusEvent]);
  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: errorOrders,
  } = useGetOrdersByRestaurantId(restId);

  useEffect(() => {
    if (dishReadyEvent && dishReadyEvent.message) {
      dispatch(addMessage({ message: dishReadyEvent.message, id: Date.now(), type: 'ready' }));
      console.log('dishReady event in useEffect');
      // refetch({ force: true }).then(() => console.log('event after refetch'));
    }
  }, [dishReadyEvent, dispatch]);

  const tables = tablesData?.data;
  const orders = ordersData?.data.orders;

  // const isLoading = isLoadingTables || isLoadingOrders;

  // if (isLoading) {
  //   return <Loader size="lg" />;
  // }

  // const hasError = isErrorTables || isErrorOrders;

  // if (hasError) {
  //   toast.error('Something went wrong!');
  // }

  const filterOrdersByTableId = (orders, table_id) =>
    orders?.filter((order) => order.table_id === table_id);
  console.log('re-render');
  return (
    <div className={styles.tables}>
      <Sidebar />
      <Title>Tables Board</Title>
      <div className={styles.tables__container}>
        {tables?.map((table) => (
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
      </div>
    </div>
  );
};

export default TablesWaiterPage;
