import { MainWrapper } from './MainWrapper';
import '../../styles.scss';

const meta = {
  title: 'Shared/MainWrapper',
  component: MainWrapper,
  tags: ['autodocs'],
};
export default meta;
const Template = (args) => <MainWrapper {...args} />;
export const Default = Template.bind({});
