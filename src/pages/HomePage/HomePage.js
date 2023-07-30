import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.scss';
import logo from '../../img/RESTio.svg';
import Title from '../../shared/Title/Title';

const HomePage = () => {
  return (
    <div className={`${styles.background}`}>
      <main>
        <div className="main__container">
          <img className={`${styles.img__logo}`} src={logo} alt="logo" width={80} height={80} />
          <Title mode="h1" color="var(--color-dark-blue)" classname={`${styles.title}`}>
            Welcome to Restio!
          </Title>
          {/* <h1 className={`${styles.title}`}>Welcome to Restio!</h1> */}
          <p className={`${styles.description}`}>
            We're thrilled to have you on board, and we know you'll take our restaurant to new
            heights. Let's make each day a delectable delight together! Bon appétit, and let's make
            some kitchen magic happen!
          </p>
          <div className={`${styles.buttons__container}`}>
            <NavLink className={`${styles.link}`}>Log in</NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
