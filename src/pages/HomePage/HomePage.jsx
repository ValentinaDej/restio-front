import { NavLink } from 'react-router-dom';

import { Title, Text, Logo, MainWrapper } from 'shared';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <MainWrapper classname={`${styles.bg}`}>
      <div className="main__container">
        <Logo size="lg" classname={`${styles.img__logo}`} />
        <Title mode="h1" classname={`${styles.title}`}>
          Welcome to Restio!
        </Title>
        <Text mode="p" classname={`${styles.description}`}>
          We're thrilled to have you on board, and we know you'll take our restaurant to new
          heights. Let's make each day a delectable delight together! Bon appétit, and let's make
          some kitchen magic happen!
        </Text>
        <div className={`${styles.buttons__container}`}>
          <NavLink className={`${styles.link}`} to="/login">
            Log in
          </NavLink>
        </div>
      </div>
    </MainWrapper>
  );
};

export default HomePage;
