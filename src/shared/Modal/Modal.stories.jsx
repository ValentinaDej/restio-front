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
    children: {
      type: 'React.ReactNode',
      description: 'Content of modal is react component',
    },
    classname: {
      type: 'string',
      description: 'You can add the required styles',
    },
    position: {
      type: 'string',
      description: 'Always you write value - fixed',
    },
  },
};
export default meta;

const mockSetIsModalOpen = () => {
  console.log('Modal is closed');
};

const ModalContent = () => {
  return (
    <div style={{ textAlign: 'center', width: '200px', height: '200px' }}>
      <h2>Modal Content</h2>
      <p>This is the content of the modal.</p>
    </div>
  );
};

const Template = (args) => (
  <div style={{ width: '100%', height: '300px', position: 'relative' }}>
    <Modal {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  setIsModalOpen: mockSetIsModalOpen,
  children: <ModalContent />,
  position: 'relative',
};
