import '../../styles.scss';
import { Modal } from './Modal';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    setIsModalOpen: {
      action: 'clicked',
      type: 'function',
      description: 'Function changes the modal state',
      defaultValue: true,
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
    isModalOpen: {
      type: 'boolean',
      description: 'State of modal: open or not',
      defaultValue: false,
    },
  },
};
export default meta;

const mockSetIsModalClose = () => {
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

const Template = (args) => {
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <Modal {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  setIsModalOpen: mockSetIsModalClose,
  children: <ModalContent />,
  position: 'relative',
  isModalOpen: true,
};
