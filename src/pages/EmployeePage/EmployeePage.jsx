import React from 'react';
import styles from './EmployeePage.module.scss';
import EmployeeCard from '../../shared/EmployeeCard/EmployeeCard';
import axios from 'axios';
import Title from '../../shared/Title/Title';
import EmptyCard from '../../shared/EmptyCard/EmptyCard';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeePage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/personnel/restaurant/${restId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const navigateToAddEmpl = () => {
    navigate(`/admin/${restId}/personnel/new`);
  };

  const { data } = useQuery('personnel', fetchData);
  return (
    <>
      <main>
        <div className={styles['personnel-container']}>
          <Title textAlign={'left'}>Personnel</Title>
          <hr className={styles.divider} />
          <ul className={`${styles.menu_wrapper}`}>
            <li key={`empty`} className={styles.card_wrapper}>
              <EmptyCard
                text={`employee`}
                mode={`outlined`}
                onClick={navigateToAddEmpl}
              ></EmptyCard>
            </li>
            {data?.map((item) => {
              return (
                <li key={item.id} className={styles.card_wrapper}>
                  <EmployeeCard data={item} mode={'outlined'}></EmployeeCard>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default EmployeePage;
