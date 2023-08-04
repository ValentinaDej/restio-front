import React from 'react';
import styles from './EmployeePage.module.scss';
import EmployeeCard from '../../shared/EmployeeCard/EmployeeCard';
import axios from 'axios';
import Title from '../../shared/Title/Title';
import EmptyCard from '../../shared/EmptyCard/EmptyCard';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from 'api';
import toast from 'react-hot-toast';
import { ReactQueryDevtools } from 'react-query/devtools';

const EmployeePage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/personnel/restaurant/${restId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const navigateToAddEmpl = () => {
    navigate(`/admin/${restId}/personnel/new`);
  };

  const deleteEmployeeMutation = useMutation((employeeId) =>
    axios
      .delete(`${BASE_URL}/personnel/${employeeId}`, {
        data: { restaurant_id: restId },
      })
      .then(() => {
        // Handle the successful response if needed
        toast.success('Employee deleted successfully');
        console.log('Employee deleted successfully');
      })
      .catch((error) => {
        // Handle errors here
        toast.error('Error deleting employee');
        console.error(error);
      })
  );
  const { data, refetch } = useQuery('personnel', fetchData);

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployeeMutation.mutateAsync(employeeId);
      await refetch();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

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
                <li key={item._id} className={styles.card_wrapper}>
                  <EmployeeCard
                    data={item}
                    mode={'outlined'}
                    handleDelete={() => {
                      handleDelete(item._id);
                    }}
                  ></EmployeeCard>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default EmployeePage;
