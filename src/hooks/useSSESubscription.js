import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addMessage } from 'store/messages/messagesSlice';

const useSSESubscription = () => {
  const { restId } = useParams();
  const dispatch = useDispatch();

  const subscribe = useCallback(
    (restId) => {
      if (!restId) return;
      const eventSource = new EventSource(`http://localhost:3001/sse/${restId}`);

      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        dispatch(addMessage({ id: Date.now(), message: eventData }));
      };

      eventSource.onerror = (error) => {
        eventSource.close();
        // console.error('Error occurred with SSE connection:', error);
      };
      return eventSource;
    },
    [dispatch]
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
