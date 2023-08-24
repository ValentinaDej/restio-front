import { CategoryTabs } from './CategoryTabs';

const meta = {
  title: 'Shared/CategoryTabs',
  component: CategoryTabs,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Tab button appearance options',
      defaultValue: 'primary',
      options: ['primary', 'outlined'],
      control: {
        type: 'radio',
      },
    },
    categories: {
      type: { name: 'array', required: false },
      description: 'Array of category names',
      defaultValue: [
        'burger',
        'snack',
        'sauce',
        'hot-dog',
        'combo',
        'drinks',
        'pizza',
        'wok',
        'dessert',
      ],
      control: { type: 'object' },
    },
  },
};

export default meta;

const Template = (args) => <CategoryTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  mode: 'primary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  mode: 'outlined',
};
