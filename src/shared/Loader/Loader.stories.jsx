import '../../styles.scss';
import { Loader } from './Loader';

const meta = {
  title: 'Shared/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: 'string',
      description: 'Loader size options',
      defaultValue: 'sm',
      options: ['md', 'sm', 'lg', 'xs'],
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

export const VerySmallLoader = Template.bind({});
VerySmallLoader.args = {
  size: 'xs',
};

export const MediumLoader = Template.bind({});
MediumLoader.args = {
  size: 'md',
};

export const LargeLoader = Template.bind({});
LargeLoader.args = {
  size: 'lg',
};
