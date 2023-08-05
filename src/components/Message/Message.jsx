import Text from 'shared/Text/Text';
import css from './Message.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesFromState } from 'store/messages/messagesSelector';
import { MdOutlineClose } from 'react-icons/md';
import { deleteMessage } from 'store/messages/messagesSlice';

const Message = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessagesFromState);
  const onClickHandler = (id) => {
    dispatch(deleteMessage(id));
  };
  return (
    <>
      {messages?.length > 0 && (
        <ul className={css.list}>
          {messages.map(({ message, id }) => (
            <li key={id} className={css.container}>
              <MdOutlineClose className={css.icon} onClick={() => onClickHandler(id)} />
              <Text fontWeight={600} color={`var(--color-blue-dark)`}>
                {message}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Message;
