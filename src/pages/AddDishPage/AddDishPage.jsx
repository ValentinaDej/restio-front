import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import DishForm from 'shared/DishForm/DishForm';
import Button from 'shared/Button/Button';
import Title from 'shared/Title/Title';
import Loader from 'shared/Loader/Loader';

import { DISH_CATEGORIES } from 'utils/constants';

import { getDishById, createDish, updateDishById } from '../../api/dish';
import { getIngridients } from '../../api/ingridient';
import styles from './AddDishPage.module.scss';

const AddDishPage = () => {
  const { restId, dishesId } = useParams();
  const navigate = useNavigate();

  const dishQuery = useQuery(['new_dish', dishesId], () => getDishById(dishesId), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!dishesId,
    onError: () => {
      toast.error('Error fetching dish data');
    },
  });

  const ingridientsQuery = useQuery('ingredients', getIngridients, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    onError: () => {
      toast.error('Error fetching ingridient data');
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Form data:', formData);
      if (dishesId) {
        await updateDishById(formData, dishesId);
        toast.success('Dish updated successfully');
      } else {
        await createDish(formData, restId);
        toast.success('Dish added successfully');
      }
      handleBack();
    } catch (error) {
      toast.error('Error saving or editing dish');
    } finally {
    }
  };

  if (dishQuery.isLoading || ingridientsQuery.isLoading) {
    return (
      <main className={styles.loadingWrapper}>
        <Loader />
      </main>
    );
  }

  const selectedIngredientsMap = new Map(
    (dishQuery.data?.ingredients || []).map((ingredient) => [ingredient._id, ingredient.name])
  );

  const initialData = {
    name: dishQuery.data?.name || '',
    spicy: dishQuery.data?.spicy || false,
    vegetarian: dishQuery.data?.vegetarian || false,
    pescatarian: dishQuery.data?.pescatarian || false,
    isActive: dishQuery.data?.isActive || false,
    portionWeight: dishQuery.data?.portionWeight || 0,
    price: dishQuery.data?.price || 0,
    picture: dishQuery.data?.picture || '',
    type: dishQuery.data?.type || '',
  };

  return (
    <div>
      <main className={styles.addDishContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <Button mode={'outlined'} onClick={handleBack}>
              Back
            </Button>
            {dishesId ? <Title>Edit dish</Title> : <Title>Create dish</Title>}
          </div>
          <DishForm
            onSubmit={handleSubmit}
            category={DISH_CATEGORIES}
            ingridients={ingridientsQuery.data}
            selectedIngredientsMap={selectedIngredientsMap}
            initialState={initialData}
            isEditing={Boolean(dishesId)}
          />
        </div>
      </main>
    </div>
  );
};

export default AddDishPage;
