import React from 'react';
import Status from './Status'; // Replace './Status' with the correct path to your component
import '../../styles.scss';

export default {
  title: 'Shared/Status', // The title to display in Storybook's sidebar
  component: Status, // The React component that you want to showcase
  tags: ['autodocs'], // Any tags you want to add (optional)
  argTypes: {
    // Define your component's props and their types here
    // Example: (replace with the actual prop types of your component)
    status: {
      type: 'string',
      description: 'The status of the item',
      options: ['active', 'inactive'],
      control: {
        type: 'radio',
      },
    },
    // Add more props as needed...
  },
};

// Create a template function that renders your component with the provided args
const Template = (args) => <Status {...args} />; // Replace 'Status' with your component name

// Create different stories to showcase different variations of your component
// You can create as many stories as you want
export const ActiveStatus = Template.bind({});
ActiveStatus.args = {
  status: 'active', // Provide the props specific to this story
};

export const InactiveStatus = Template.bind({});
InactiveStatus.args = {
  status: 'inactive', // Provide the props specific to this story
};

// Add more stories as needed...

// You can also create a "Default" story to showcase your component with default props
export const Default = Template.bind({});
Default.args = {
  // Default props for your component, if applicable
  // Example: (replace with the default props of your component)
  status: 'active',
};
