import React, { useState } from 'react';
import axios from 'axios';
import EmployeeForm from '../../shared/EmployeeForm/EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loader from '../../shared/Loader/Loader';
import styles from './AddPersonnelPage.module.scss';
import Title from '../../shared/Title/Title';
import Button from '../../shared/Button/Button';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../api';

const AddPersonnelPage = () => {
  const { personId, restId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchData(personId) {
    try {
      const response = await axios.get(`${BASE_URL}/personnel/${personId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const { data, isLoading } = useQuery(['new_personnel', personId], () => fetchData(personId), {
    enabled: !!personId,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', formData);
      let response;
      if (personId) {
        // If personId exists, it means we are updating an existing personnel
        response = await axios.patch(`${BASE_URL}/personnel/${personId}`, {
          ...formData,
          restaurant_id: restId,
        });
        toast.success('Personnel updated successfully');
        console.log('Personnel updated successfully:', response.data);
      } else {
        // If personId doesn't exist, it means we are adding a new personnel
        response = await axios.post(`${BASE_URL}/personnel`, {
          ...formData,
          restaurant_id: restId,
        });
        toast.success('Personnel added successfully');
        console.log('Personnel added successfully:', response.data);
      }
      handleBack();
    } catch (error) {
      toast.error('Error saving or editing personnel');
      console.error('Error saving personnel:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    picture: data?.picture,
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
      picture: '',
    };
  }

  return (
    <div>
      <main className={styles.addPersonnelContainer}>
        <div className={styles.formWrapper}>
          {/* Back button in one line with the Title */}
          <div className={styles.header}>
            <Button mode={'outlined'} onClick={handleBack}>
              Back
            </Button>
            <Title>Add Personnel</Title>
          </div>
          <EmployeeForm onSubmit={handleSubmit} size={'md'} initialState={initialData} />
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};
export default AddPersonnelPage;
