import React from 'react';
import { FileUploader } from './FileUploader';

export default {
  title: 'Shared/FileUploader', // The title of the component in the Storybook sidebar
  component: FileUploader, // The component itself
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['default', 'sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs', 'shared'], // Tags for filtering in the Storybook sidebar
};

// Template for Default FileUploader
const Template = (args) => <FileUploader {...args} />;

// Default FileUploader Story
export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'Default FileUploader';

// Template for Small FileUploader
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};
Small.storyName = 'Small FileUploader';

// Template for Medium FileUploader
export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};
Medium.storyName = 'Medium FileUploader';

// Template for Large FileUploader
export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};
Large.storyName = 'Large FileUploader';
