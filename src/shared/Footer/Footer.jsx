import classes from './Footer.module.scss';
import { send } from 'emailjs-com';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsTelegram, BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from '@react-icons/all-files/ai/AiFillInstagram';
import { Input, Button, Modal } from 'shared';

export const Footer = () => {
  const [from_name, SetFromName] = useState('');
  const [reply_to, SetFromEmail] = useState('');
  const [message, SetMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sendEmail = () => {
    send(
      process.env.REACT_APP_EMAILJS_SERVICE,
      process.env.REACT_APP_EMAILJS_TEMPLATE,
      {
        from_name,
        reply_to,
        message,
      },
      process.env.REACT_APP_EMAILJS_USER
    )
      .then(() => {
        toast.success('Message sent successfully');
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
    SetFromName('');
    SetFromEmail('');
    SetMessage('');
  };

  const handleChangeMessage = (e) => {
    SetMessage(e);
  };

  const handleChangeName = (e) => {
    SetFromName(e);
  };

  const handleChangeEmail = (e) => {
    SetFromEmail(e);
  };

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={`${classes.footer__wrapper} ${classes.socialSection}`}>
          <h3 className={classes.footer__heading}>Follow us on socials</h3>
          <div className={classes.socialIcons}>
            <a
              href="https://t.me/DeepKross"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.footer__link}
            >
              <div className={classes.socialIcon}>
                <BsTelegram size={`40`} />
              </div>
            </a>
            <a
              href="https://twitter.com/@mike_tanch"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.footer__link}
            >
              <div className={classes.socialIcon}>
                <BsTwitter size={`40`} />
              </div>
            </a>
            <a
              href="https://www.instagram.com/mishka.tanch"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.footer__link}
            >
              <div className={classes.socialIcon}>
                <AiFillInstagram size={`40`} />
              </div>
            </a>
          </div>
        </div>
        <div className={classes.footer__btnWrapper}>
          <Button mode={`outlined`} onClick={handleModal}>
            {' '}
            Contact us{' '}
          </Button>
        </div>
      </div>

      <div className={classes.footer__copyright}>
        <p>&copy; {new Date().getFullYear()} Restaurant App. All rights reserved.</p>
      </div>

      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <div className={`${classes.footer__wrapper} ${classes.formWrapper}`}>
          <h3 className={classes.footer__heading}>Contact Us</h3>
          <div className={classes.inlineInputs}>
            <Input
              size={`sm`}
              placeholder="Your name"
              id="name"
              value={from_name}
              onChange={(e) => handleChangeName(e.target.value)}
            />
            <Input
              size={`sm`}
              placeholder="Your email"
              id="email"
              value={reply_to}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
          </div>
          <textarea
            className={classes.messageInput}
            placeholder="Your message"
            id="message"
            value={message}
            onChange={(e) => handleChangeMessage(e.target.value)}
          />
          <div className={classes.footer__btnWrapper}>
            <Button onClick={sendEmail}>Send Message</Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
};
