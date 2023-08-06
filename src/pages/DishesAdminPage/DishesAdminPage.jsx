import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { BASE_URL } from 'api';
import styles from './DishesAdminPage.module.scss';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();

  const fetchDishesList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dishes/restaurant/${restId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const { data, isLoading, refetch } = useQuery('fetchDishesList', fetchDishesList, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync } = useMutation((dishId) => {
    axios.delete(`${BASE_URL}/dishes/${dishId}/restaurant/${restId}`);
  });

  const navigateToAddDish = () => {
    navigate(`/admin/${restId}/dishes/new`);
  };

  const handleDelete = async (id) => {
    try {
      await toast.promise(mutateAsync(id), {
        loading: 'Deleting...',
        success: 'Dish deleted successfully',
        error: 'Error deleting dish',
      });
      await refetch();
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      data={data}
      isLoading={isLoading}
      goToAdd={navigateToAddDish}
      handleDelete={handleDelete}
    />
  );
};
export default DishesAdminPage;
