import classes from './Footer.module.scss';
import { BsTelegram, BsTwitter } from 'react-icons/bs';
import { AiFillInstagram } from '@react-icons/all-files/ai/AiFillInstagram';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { send } from 'emailjs-com';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../api/restaurant';
import { useLocation } from 'react-router-dom';
import Title from '../Title/Title';

const Footer = (role) => {
  const { pathname } = useLocation();
  const arrParams = pathname.split('/');

  const restId = arrParams[1];
  const [from_name, SetFromName] = useState('');
  const [reply_to, SetFromEmail] = useState('');
  const [message, SetMessage] = useState('');
  const sendEmail = () => {
    send(
      process.env.EMAILJS_SERVICE,
      process.env.EMAILJS_TEMPLATE,
      {
        from_name,
        reply_to,
        message,
      },
      process.env.EMAILJS_USER
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

  const { data } = useQuery(['restaurant', restId], async () => await getRestaurant(restId), {
    refetchOnWindowFocus: false, // Disable refetching when the window gains focus
    refetchOnReconnect: false, // Disable refetching when the network reconnects
    refetchInterval: false, // Disable automatic periodic refetching
  });

  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.leftColumn}>
          <div className={`${classes.footer__wrapper}`}>
            <h3 className={classes.footer__heading}>About Us</h3>
            <Text fontSize={19}>
              We're dedicated to providing restaurant owners the best products to manage their
              businesses efficiently.
            </Text>
          </div>
          <div className={`${classes.footer__wrapper}`}>
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
        </div>
        {role === '' ? (
          <div className={classes.formWrapper}>
            <Title>{data?.name}</Title>
            <div className={classes.header__logo}>
              <img src={data?.picture} alt="logo" className={classes.header__img} />
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <div className={classes.footer__copyright}>
        <p>&copy; {new Date().getFullYear()} Restaurant App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
