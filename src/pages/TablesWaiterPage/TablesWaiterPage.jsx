import Message from 'components/Message/Message';
import { useSSE } from 'react-hooks-sse';

const TablesWaiterPage = () => {
  const updateTableStatusEvent = useSSE('table status', {});
  const dishReadyEvent = useSSE('dish is ready', {});
  console.log('Call Waiter SSE Event:', updateTableStatusEvent);
  console.log('Dish Event:', dishReadyEvent);
  function Test() {
    console.log('test');
  }
  Test();
  return (
    <div>
      TablesWaiter Page
      <Message />
    </div>
  );
};

export default TablesWaiterPage;
