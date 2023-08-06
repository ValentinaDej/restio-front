import { useEffect } from 'react';

import Message from 'components/Message/Message';
import useSSESubscription from 'hooks/useSSESubscription';

const TablesWaiterPage = () => {
  const subscription = useSSESubscription();

  useEffect(() => {
    subscription();
  }, [subscription]);

  return (
    <div>
      TablesWaiter Page
      <Message />
    </div>
  );
};

export default TablesWaiterPage;
