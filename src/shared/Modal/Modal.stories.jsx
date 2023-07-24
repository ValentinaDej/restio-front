import Modal from './Modal';
import '../../styles.scss';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    setIsModalOpen: {
      action: 'clicked',
      type: 'function',
      description: 'Function changes the modal state',
    },
  },
};
export default meta;

const mockSetIsModalOpen = () => {
  console.log('Modal is closed');
};

const ModalContent = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Modal Content</h2>
      <p>This is the content of the modal.</p>
    </div>
  );
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  setIsModalOpen: mockSetIsModalOpen,
  children: <ModalContent />,
};
