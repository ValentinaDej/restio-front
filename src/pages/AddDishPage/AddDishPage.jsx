import { useQueryClient, useQueries } from 'react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { DISH_CATEGORIES } from 'utils/constants';

import { getDishById, createDish, updateDishById } from '../../api/dish';
import { getIngredients } from '../../api/ingredient';

import DishForm from 'shared/DishForm/DishForm';
import Button from 'shared/Button/Button';
import Title from 'shared/Title/Title';
import Loader from 'shared/Loader/Loader';

import styles from './AddDishPage.module.scss';

const ERROR_MESSAGES = {
  fetchDish: 'Error fetching dish data',
  fetchIngredients: 'Error fetching ingredient data',
  savingEditing: 'Error saving or editing dish',
};

const SUCCESS_MESSAGES = {
  successfullyCreated: 'Added successfully',
  successfullyUpdated: 'Updated successfully',
};

const AddDishPage = () => {
  const { restId, dishesId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queries = useQueries([
    {
      queryKey: ['new_dish', dishesId],
      queryFn: () => (dishesId ? getDishById(dishesId) : null),
      onError: () => {
        toast.error(ERROR_MESSAGES.fetchDish);
      },
    },
    {
      queryKey: 'ingredients',
      queryFn: getIngredients,
      onError: () => {
        toast.error(ERROR_MESSAGES.fetchIngredients);
      },
    },
  ]);

  const dishQuery = queries[0];
  const ingredientsQuery = queries[1];

  const handleBack = () => {
    navigate(`/${restId}/admin/dishes/`, {
      state: {
        shouldUpdate: true,
      },
    });
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Form data:', formData);
      if (dishesId) {
        await updateDishById(formData, dishesId, restId);
        toast.success(SUCCESS_MESSAGES.successfullyUpdated);
      } else {
        await createDish(formData, restId);
        toast.success(SUCCESS_MESSAGES.successfullyCreated);
      }
      queryClient.invalidateQueries(['new_dish', dishesId]);
      queryClient.invalidateQueries('ingredients');

      handleBack();
    } catch (error) {
      toast.error(ERROR_MESSAGES.savingEditing);
    } finally {
    }
  };

  if (dishQuery.isLoading || ingredientsQuery.isLoading) {
    return (
      <main className={styles.loadingWrapper}>
        <Loader />
      </main>
    );
  }

  const selectedIngredientsMap = new Map(
    (dishQuery.data?.ingredients || []).map((ingredient) => [ingredient._id, ingredient.name])
  );

  let initialData = {};

  initialData = {
    name: dishQuery.data?.name || '',
    spicy: dishQuery.data?.spicy || false,
    vegetarian: dishQuery.data?.vegetarian || false,
    pescatarian: dishQuery.data?.pescatarian || false,
    isActive: dishQuery.data?.isActive || false,
    portionWeight: dishQuery.data?.portionWeight || '',
    price: dishQuery.data?.price || '',
    type: dishQuery.data?.type || '',
  };

  if (dishQuery.data?.picture) {
    initialData.picture = dishQuery.data.picture;
  }

  const isEditing = Boolean(dishesId);

  return (
    <div>
      <main className={styles.addDishContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.buttonWrapper}>
              <Button mode={'outlined'} onClick={handleBack} size="sm">
                Back
              </Button>
            </div>
            {isEditing ? <Title>Update dish</Title> : <Title>Create dish</Title>}
          </div>
          <DishForm
            onSubmit={handleSubmit}
            category={DISH_CATEGORIES}
            ingredientsList={ingredientsQuery.data}
            selectedIngredientsMap={selectedIngredientsMap}
            initialState={initialData}
            isEditing={isEditing}
            handleBack={handleBack}
          />
        </div>
      </main>
    </div>
  );
};

export default AddDishPage;
