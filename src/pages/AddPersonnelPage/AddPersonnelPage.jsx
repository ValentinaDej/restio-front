import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import styles from './AddPersonnelPage.module.scss';
import { Title, Button, Loader, EmployeeForm } from 'shared';
import { createPersonnel, getPersonnelById, updatePersonnel } from 'api/personnel';

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
    void queryClient.invalidateQueries({ queryKey: ['new_personnel'] });
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      let response;
      if (personId) {
        response = await updatePersonnel(personId, formData, restId);
      } else {
        response = await createPersonnel(formData, restId);
      }
      await queryClient.invalidateQueries('personnel');
      const successResp = ['200', '201', '204'];
      if (successResp.includes(response.status.toString())) {
        handleBack();
      }
    } catch (error) {
      toast.error('Error saving or editing personnel');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isSubmitting) {
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
            <Title>{personId ? 'Edit' : 'Add'} Personnel</Title>
          </div>
          <EmployeeForm onSubmit={handleSubmit} size={'md'} initialState={initialData} />
        </div>
      </main>
    </div>
  );
};
export default AddPersonnelPage;
