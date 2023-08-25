import { Logo } from './Logo';
import '../../styles.scss';

const meta = {
  title: 'Shared/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      type: 'string',
      description: 'Logo size options',
      defaultValue: 'sm',
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};
export default meta;
const Template = (args) => <Logo {...args} />;
export const Default = Template.bind({});
Default.args = {
  size: 'sm',
};

export const MediumLogo = Template.bind({});
MediumLogo.args = {
  size: 'md',
};

export const LargLogo = Template.bind({});
LargLogo.args = {
  size: 'lg',
};
