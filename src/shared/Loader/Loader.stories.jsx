import Loader from './Loader';
import '../../styles.scss';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: 'string',
      description: 'Loader size options',
      defaultValue: 'sm',
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};
export default meta;
const Template = (args) => <Loader {...args} />;
export const Default = Template.bind({});
Default.args = {
  size: 'sm',
};

export const MediumLoader = Template.bind({});
MediumLoader.args = {
  size: 'md',
};

export const LargeLoader = Template.bind({});
LargeLoader.args = {
  size: 'lg',
};
