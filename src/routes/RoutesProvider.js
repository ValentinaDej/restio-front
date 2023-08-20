import { SSEProvider } from 'react-hooks-sse';
import { Outlet } from 'react-router-dom';

import { BASE_URL } from 'api';
import { Header } from 'shared';

const RoutesProvider = ({ restId, role }) => {
  return (
    <SSEProvider endpoint={`${BASE_URL}/sse/${restId}`}>
      <Header role={role ? role : 'customer'} />
      <main>
        <Outlet />
      </main>
    </SSEProvider>
  );
};
export default RoutesProvider;
