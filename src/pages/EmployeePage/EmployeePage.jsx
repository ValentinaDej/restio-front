import React, { useEffect, useState } from 'react';
import styles from './EmployeePage.module.scss';
import EmployeeCard from '../../shared/EmployeeCard/EmployeeCard';
import axios from 'axios';
import Title from '../../shared/Title/Title';
import EmptyCard from '../../shared/EmptyCard/EmptyCard';

const EmployeePage = ({ restaurant_id }) => {
  // State to store the fetched data
  const [personnelData, setPersonnelData] = useState([]);

  // useEffect hook to fetch data when the component is mounted
  useEffect(() => {
    // Function to fetch data from the backend server
    const fetchData = async () => {
      try {
        // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend API endpoint
        const response = await axios.get(
          `http://localhost:3001/personnel/restaurant/${restaurant_id}`
        );

        console.log(response.data);

        setPersonnelData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Call the data fetching function
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  return (
    <>
      <main>
        <div className={styles['personnel-container']}>
          <Title>Personnel</Title>
          <ul className={`${styles.menu_wrapper}`}>
            <li className={styles.card_wrapper}>
              <EmptyCard text={`employee`} mode={`outlined`}></EmptyCard>
            </li>
            {personnelData.map((item) => {
              return (
                <li className={styles.card_wrapper} key={item.id}>
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
