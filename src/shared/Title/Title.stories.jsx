import React from 'react';
import { Title } from './Title';
import '../../styles.scss';

export default {
  title: 'Shared/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Title mode options',
      defaultValue: 'h2',
      options: ['h1', 'h2', 'h3'],
      control: {
        type: 'radio',
      },
    },
    fontWeight: {
      type: 'number',
      description: 'Font weight options',
      defaultValue: 700,
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      control: { type: 'select' },
    },
    fontSize: {
      type: 'number',
      description: 'Font size options',
      defaultValue: 25,
      control: { type: 'number' },
    },
    color: {
      type: 'string',
      description: 'Text color options',
      defaultValue: '#000',
      control: { type: 'color' },
    },
    textAlign: {
      type: 'string',
      description: 'Text alignment options',
      defaultValue: 'center',
      options: ['start', 'end', 'center', 'left', 'right'],
      control: {
        type: 'radio',
      },
    },
    children: {
      type: 'string',
      name: 'Text Content',
      defaultValue: 'Title...',
    },
  },
};

const Template = (args) => <Title {...args} />;

export const H1 = Template.bind({});
H1.args = {
  mode: 'h1',
  children: 'This is an H1 Title.',
  fontWeight: 700,
  fontSize: 30,
  color: '#000',
  textAlign: 'center',
};

export const H2 = Template.bind({});
H2.args = {
  mode: 'h2',
  children: 'This is an H2 Title.',
  fontWeight: 700,
  fontSize: 25,
  color: '#000',
  textAlign: 'center',
};

export const H3 = Template.bind({});
H3.args = {
  mode: 'h3',
  children: 'This is an H3 Title.',
  fontWeight: 700,
  fontSize: 20,
  color: '#000',
  textAlign: 'center',
};
//
