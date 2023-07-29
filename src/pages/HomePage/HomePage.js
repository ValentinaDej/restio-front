import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={`${styles.background}`}>
      <main>
        <div>
          {/* <img className="image" src={logo} alt="logo" /> */}
          <h1 className={`${styles.title}`}>Welcome to Restio!</h1>
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