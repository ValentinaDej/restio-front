import classes from './Footer.module.scss';
import Text from 'shared/Text/Text';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="footer__container">
        <div className={classes.footer__wrapper}>
          <Text color="var(--color-white)">RESTio 2023</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
