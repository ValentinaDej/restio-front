import { IconButton } from './IconButton';
import { BiSolidTrash } from 'react-icons/bi';

const meta = {
  title: 'Shared/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    Svg: {
      type: '',
      description: 'Svg component',
    },
    disabled: { type: 'boolean', control: 'boolean', description: 'The disable' },
    size: {
      type: 'number',
      control: 'number',
      description: 'The checkbox size',
      table: { defaultValue: { summary: 20 } },
    },
    mode: {
      type: 'string',
      description: 'Mods variants',
      table: { defaultValue: { summary: 'clear' } },
      options: ['clear', 'filled', 'outlined'],
      control: {
        type: 'radio',
      },
    },
    onClick: {
      type: 'function',
      defaultValue: (e) => {
        console.log(e);
      },
      description: 'Any func',
      options: 'func',
      table: { defaultValue: { summary: '() => void' } },
    },
  },
};

export default meta;

export const Default = {
  args: {
    Svg: BiSolidTrash,
  },
};

export const Filled = {
  args: {
    mode: 'filled',
    Svg: BiSolidTrash,
  },
};

export const Outlined = {
  args: {
    mode: 'outlined',
    Svg: BiSolidTrash,
  },
};

export const CustomSize = {
  args: {
    size: 30,
    Svg: BiSolidTrash,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    Svg: BiSolidTrash,
  },
};
