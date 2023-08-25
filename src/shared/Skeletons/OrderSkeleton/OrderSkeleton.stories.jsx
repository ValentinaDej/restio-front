import '../../../styles.scss';
import { OrderSkeleton } from './OrderSkeleton';

const meta = {
  title: 'Shared/OrderListSkeleton',
  component: OrderSkeleton,
  tags: ['autodocs'],
  args: {
    isSmall: {
      type: 'boolean',
      description: 'For different size, true - small, false - another',
    },
    isWaiter: { type: 'boolean', description: 'If true - is for Waiter, false - for Customer' },
  },
};
export default meta;
const Template = (args) => <OrderSkeleton {...args} />;
export const Default = Template.bind({});
