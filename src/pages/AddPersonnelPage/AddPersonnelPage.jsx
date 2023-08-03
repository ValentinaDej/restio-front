import React from 'react';
import axios from 'axios';
import EmployeeForm from '../../shared/EmployeeForm/EmployeeForm';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loader from '../../shared/Loader/Loader';
import styles from './AddPersonnelPage.module.scss';

const AddPersonnelPage = () => {
  const { personId } = useParams();

  async function fetchData(personId) {
    try {
      const response = await axios.get(`http://localhost:3001/personnel/${personId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data, isLoading } = useQuery(['new_personnel', personId], () => fetchData(personId), {
    enabled: !!personId,
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return (
      <main className={styles.loadingWrapper}>
        <Loader size={'lg'} />
      </main>
    );
  }

  // Check if data is null before accessing its properties
  const firstName = data?.name.substring(0, data.name.indexOf(' ')) || '';
  const lastName = data?.name.substring(data.name.indexOf(' ') + 1) || '';

  let initialData = {
    firstName,
    lastName,
    email: data?.email,
    password: '',
    role: data?.role,
    gender: data?.gender,
    phone: data?.phone,
    address: data?.address,
    image: data?.picture,
  };

  if (!data) {
    initialData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      gender: '',
      phone: '',
      address: '',
      image: '',
    };
  }

  return (
    <div>
      <main className={styles.addPersonnelContainer}>
        <h1>Add Personnel</h1>
        <EmployeeForm onSubmit={handleSubmit} size={'sm'} initialState={initialData} />
      </main>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};
export default AddPersonnelPage;
