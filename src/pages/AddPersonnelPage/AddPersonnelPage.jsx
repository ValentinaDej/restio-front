import React, { useEffect, useState } from 'react';
import EmployeeForm from '../../shared/EmployeeForm/EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loader from '../../shared/Loader/Loader';
import styles from './AddPersonnelPage.module.scss';
import Title from '../../shared/Title/Title';
import Button from '../../shared/Button/Button';
import toast from 'react-hot-toast';
import { createPersonnel, getPersonnelById, updatePersonnel } from '../../api/personnel';

const AddPersonnelPage = () => {
  const { personId, restId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['new_personnel', personId],
    () => getPersonnelById(personId, restId),
    {
      enabled: !!personId,
      onError: () => {
        toast.error('Error fetching personnel data');
      },
    }
  );

  useEffect(() => {
    // Display the toast notification only when personId is defined
    if (personId !== undefined) {
      const toastId = toast((t) => (
        <div
          className={styles.note}
          style={{
            ...t.style,
            display: t.visible ? 'flex' : 'none',
          }}
        >
          <p>
            Leave the <b>"Password"</b> field empty if you want to save the previous password
          </p>
          <Button size={`sm`} onClick={() => toast.dismiss(t.id)}>
            I understand
          </Button>
        </div>
      ));
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [personId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', formData);
      if (personId) {
        await updatePersonnel(personId, formData, restId);
        toast.success('Personnel updated successfully');
      } else {
        await createPersonnel(formData, restId);
        toast.success('Personnel added successfully');
      }
      await queryClient.invalidateQueries('personnel');
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
  const firstName = data?.name ? data.name.substring(0, data.name.indexOf(' ')) : '';
  const lastName = data?.name ? data.name.substring(data.name.indexOf(' ') + 1) : '';

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
