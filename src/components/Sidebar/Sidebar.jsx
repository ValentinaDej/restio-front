import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSSE } from 'react-hooks-sse';
import { MdOutlineClose } from 'react-icons/md';
import { BsFillBellFill } from 'react-icons/bs';
import { FaSatelliteDish } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidDish } from 'react-icons/bi';

import css from './Sidebar.module.scss';
import { Text } from 'shared';
import { getMessagesFromState } from 'store/messages/messagesSelector';
import { addMessage, deleteMessage } from 'store/messages/messagesSlice';
import emptyNotifications from 'assets/img/notifications.png';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(getMessagesFromState);
  const updateTableStatusEvent = useSSE('table status');
  const dishReadyEvent = useSSE('dish is ready');
  useEffect(() => {
    if (updateTableStatusEvent && updateTableStatusEvent.message) {
      if (updateTableStatusEvent.message.includes('Waiting')) {
        dispatch(
          addMessage({
            message: updateTableStatusEvent.message,
            id: Date.now(),
            type: 'waiting',
          })
        );
      }
    }
  }, [dispatch, updateTableStatusEvent]);

  useEffect(() => {
    if (dishReadyEvent && dishReadyEvent.message) {
      dispatch(addMessage({ message: dishReadyEvent.message, id: Date.now(), type: 'ready' }));
    }
  }, [dishReadyEvent, dispatch]);

  const onClickHandler = (id) => {
    dispatch(deleteMessage(id));
  };
  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleMenuHandler} className={css.button}>
        <BsFillBellFill className={css.bell} />
        {messages.length > 0 && <span className={css.messages}>{messages.length}</span>}
      </button>

      <div className={`${css.menu} ${isOpen ? css.open : ''}`}>
        <button onClick={toggleMenuHandler} className={css['menu-button']}>
          <AiOutlineClose className={css.bell} />
        </button>

        {messages?.length > 0 ? (
          <ul className={css.list}>
            {messages.map(({ message, id, type }) => (
              <li
                key={id}
                className={css.container}
                style={{
                  backgroundColor:
                    type === 'waiting' ? 'rgba(234, 18, 18, 0.1)' : 'rgba(59, 183, 126, 0.1)',
                }}
              >
                <MdOutlineClose className={css.icon} onClick={() => onClickHandler(id)} />
                <div className={css.flex}>
                  {type === 'waiting' ? (
                    <FaSatelliteDish className={css['icon-waiting']} />
                  ) : (
                    <BiSolidDish className={css['icon-dish']} />
                  )}
                  <Text fontWeight={600}>{message}</Text>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={css.wrapper}>
            <img src={emptyNotifications} className={css.img} />
            <p className={css.text}>You don't have any notifications right now.</p>
          </div>
        )}
      </div>
    </>
  );
};
