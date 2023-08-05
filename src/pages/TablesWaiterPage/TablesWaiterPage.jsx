import { useCallback, useEffect } from 'react';
import Message from 'components/Message/Message';
import { useDispatch } from 'react-redux';
import { addMessage } from 'store/messages/messagesSlice';

const TablesWaiterPage = () => {
  const dispatch = useDispatch();

  const subscribe = useCallback(async () => {
    const eventSource = new EventSource('http://localhost:3001/sse/64c4fdea4055a7111092df32');

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      // Handle the updated dish status here and update your UI accordingly
      dispatch(addMessage({ id: Date.now(), message: eventData }));
      console.log('eventData', eventData);
    };

    eventSource.onerror = (error) => {
      console.error('Error occurred with SSE connection:', error);
    };
  }, [dispatch]);
  useEffect(() => {
    subscribe();
  }, [subscribe]);

  return (
    <div>
      TablesWaiter Page
      <Message />
    </div>
  );
};

export default TablesWaiterPage;
