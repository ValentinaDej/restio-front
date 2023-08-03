import { useState } from 'react';
import EmptyCard from 'shared/EmptyCard/EmptyCard';
import Title from 'shared/Title/Title';

const DishesAdminPage = () => {
  const [dishesList, setDishesList] = useState([]);
  return (
    <div className={styles['personnel-container']}>
      <Title>Dishes List</Title>
      <ul className={`${styles.menu_wrapper}`}>
        <li className={styles.card_wrapper}>
          <EmptyCard text={`dish`} mode={`outlined`}></EmptyCard>
        </li>
        {personnelData.map((item) => {
          return (
            <li className={styles.card_wrapper} key={item.id}>
              {/* <EmployeeCard data={item} mode={'outlined'}></EmployeeCard> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DishesAdminPage;
