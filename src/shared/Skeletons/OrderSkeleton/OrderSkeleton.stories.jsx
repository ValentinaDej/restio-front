import OrderListSkeleton from './OrderSkeleton.jsx';
import '../../../styles.scss';

const meta = {
  title: 'Shared/OrderListSkeleton',
  component: OrderListSkeleton,
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
const Template = (args) => <OrderListSkeleton {...args} />;
export const Default = Template.bind({});
