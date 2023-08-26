import React from 'react';
import { Text } from './Text';
import '../../styles.scss';

export default {
  title: 'Shared/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      type: 'string',
      description: 'Text mode options',
      defaultValue: 'p',
      options: ['p', 'span'],
      control: {
        type: 'radio',
      },
    },
    fontWeight: {
      type: 'number',
      description: 'Font weight options',
      defaultValue: 600,
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      control: { type: 'select' },
    },
    fontSize: {
      type: 'number',
      description: 'Font size options',
      defaultValue: 14,
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
      defaultValue: 'Text...',
    },
  },
};

const Template = (args) => <Text {...args} />;

export const Paragraph = Template.bind({});
Paragraph.args = {
  mode: 'p',
  children: 'This is a paragraph text.',
  fontWeight: 600,
  fontSize: 14,
  color: '#000',
  textAlign: 'center',
};

export const Span = Template.bind({});
Span.args = {
  mode: 'span',
  children: 'This is a span text.',
  fontWeight: 900,
  fontSize: 14,
  color: '#000',
  textAlign: 'center',
};
