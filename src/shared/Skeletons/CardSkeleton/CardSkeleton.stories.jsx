import CardSkeleton from './CardSkeleton';
import '../../../styles.scss';

const meta = {
  title: 'Shared/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      defaultValue: 'order',
      description: 'Roles of app users',
      options: ['order', 'cart', 'waiter', 'cook'],
      control: {
        type: 'radio',
      },
    },
  },
};
export default meta;
const Template = (args) => <CardSkeleton {...args} />;
export const Default = Template.bind({});
