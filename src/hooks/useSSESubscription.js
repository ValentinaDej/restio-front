import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { addMessage } from 'store/messages/messagesSlice';

const useSSESubscription = (cb) => {
  const { restId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const subscribe = useCallback(
    (restId) => {
      if (!restId) return;
      const eventSource = new EventSource(`http://localhost:3001/sse/${restId}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        if (eventData.eventType === 'Call the waiter' || eventData.eventType === 'Dish is ready') {
          dispatch(addMessage({ id: Date.now(), message: eventData.message }));
        }
        if (eventData.eventType === 'Dish status updated') {
          const tableId = eventData.message.replace(/"/g, '');
          if (location.pathname.includes(tableId)) {
            cb();
          }
        }
        if (eventData.eventType === 'New order') {
          if (location.pathname.includes(restId)) {
            cb();
          }
        }
      };

      eventSource.onerror = (error) => {
        eventSource.close();
        // console.error('Error occurred with SSE connection:', error);
      };
      return eventSource;
    },
    [cb, dispatch, location.pathname]
  );
  useEffect(() => {
    const eventSource = subscribe(restId);
    return () => {
      eventSource.close();
    };
  }, [restId, subscribe]);

  return subscribe;
};

export default useSSESubscription;
