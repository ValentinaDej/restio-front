import Orders from 'components/Orders/Orders';
import cls from './TableWaiterPage.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';
import { useSSE } from 'react-hooks-sse';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messages/messagesSlice';
import { useEffect } from 'react';

const TableWaiterPage = () => {
  const dispatch = useDispatch();
  const updateTableStatusEvent = useSSE('table status');
  const dishReadyEvent = useSSE('dish is ready');
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
    }
  }, [dispatch, updateTableStatusEvent]);

  useEffect(() => {
    if (dishReadyEvent && dishReadyEvent.message) {
      dispatch(addMessage({ message: dishReadyEvent.message, id: Date.now(), type: 'ready' }));
    }
  }, [dishReadyEvent, dispatch]);

  return (
    <div className={cls.main}>
      <Sidebar />
      <Orders isWaiter />
    </div>
  );
};

export default TableWaiterPage;
