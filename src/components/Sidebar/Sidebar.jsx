import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import Text from 'shared/Text/Text';
import css from './Sidebar.module.scss';
import { VscBellDot } from 'react-icons/vsc';
import { FaSatelliteDish } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidDish } from 'react-icons/bi';
import { getMessagesFromState } from 'store/messages/messagesSelector';
import { deleteMessage } from 'store/messages/messagesSlice';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(getMessagesFromState);
  const onClickHandler = (id) => {
    dispatch(deleteMessage(id));
  };
  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {messages?.length > 0 && (
        <>
          <button onClick={toggleMenuHandler} className={css.button}>
            {isOpen ? (
              <>
                <VscBellDot className={css.bell} />
              </>
            ) : (
              <AiOutlineClose className={css.bell} />
            )}
          </button>

          <div className={`${css.menu} ${isOpen ? css.open : ''}`}>
            {messages?.length > 0 && (
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
