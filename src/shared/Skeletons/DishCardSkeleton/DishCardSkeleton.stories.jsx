import '../../../styles.scss';
import { DishCardSkeleton } from './DishCardSkeleton';

const meta = {
  title: 'Shared/DishCardSkeleton',
  component: DishCardSkeleton,
  tags: ['autodocs'],
};
export default meta;
const Template = (args) => <DishCardSkeleton {...args} />;
export const Default = Template.bind({});
