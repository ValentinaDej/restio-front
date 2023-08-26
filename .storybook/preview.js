import '../src/styles.scss';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
export const queryClient = new QueryClient();

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export const decorators = [
  (Story) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Story />
        </Provider>
      </QueryClientProvider>
    </MemoryRouter>
  ),
];

export default preview;
