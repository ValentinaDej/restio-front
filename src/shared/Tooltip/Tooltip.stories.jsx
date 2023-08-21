import React from 'react';
import { Tooltip } from './Tooltip';
import '../../styles.scss';
export default {
  title: 'Shared/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: 'This is text',
  children: (
    <div
      style={{
        width: '100%',
        height: 40,
        background: '#000',
        borderRadius: '10px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Hover me
    </div>
  ),
};
