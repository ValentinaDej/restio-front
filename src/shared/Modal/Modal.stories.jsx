import Modal from './Modal';
import '../../styles.scss';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    setIsModalOpen: {
      type: 'function',
      description: 'Function changes the modal state',
    },
  },
};
export default meta;

// Mocking the setIsModalOpen function for the story
const mockSetIsModalOpen = (isOpen) => {
  console.log(`Modal is ${isOpen ? 'open' : 'closed'}`);
};

const Template = (args) => (
  <Modal {...args}>
    <h2>Modal Content</h2>
    <p>This is the content of the modal.</p>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  setIsModalOpen: mockSetIsModalOpen,
};
