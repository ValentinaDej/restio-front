import { useQueryClient, useQuery } from 'react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from './AddDishPage.module.scss';
import { DishForm, Button, Title, Loader } from 'shared';
import { DISH_CATEGORIES } from 'utils/constants';
import { getDishById, createDish, updateDishById } from 'api/dish';
import { getIngredients } from 'api/ingredient';

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
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(dishesId);

  const dishQuery = useQuery(['new_dish', dishesId], () => getDishById(dishesId), {
    enabled: isEditing,
    onError: () => {
      toast.error(ERROR_MESSAGES.fetchDish);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const ingredientsQuery = useQuery('ingredients', getIngredients, {
    onError: () => {
      toast.error(ERROR_MESSAGES.fetchIngredients);
    },
    cacheTime: 10 * 60 * 60,
    staleTime: 15 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const handleBack = () => {
    void queryClient.invalidateQueries({ queryKey: ['new_dish'] });
    navigate(`/${restId}/admin/dishes/`);
  };

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    try {
      let response;
      if (dishesId) {
        response = await updateDishById(formData, dishesId, restId);
        toast.success(SUCCESS_MESSAGES.successfullyUpdated);
      } else {
        response = await createDish(formData, restId);
        toast.success(SUCCESS_MESSAGES.successfullyCreated);
      }
      await queryClient.invalidateQueries(['dishes']);
      if (response.status === 200 || response.status === 201) {
        handleBack();
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.savingEditing);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedIngredientsMap = new Map(
    (dishQuery.data?.ingredients || []).map((ingredient) => [ingredient._id, ingredient.name])
  );

  if (dishQuery.isLoading || ingredientsQuery.isLoading) {
    return (
      <main className={styles.loadingWrapper}>
        <Loader size="lg" />
      </main>
    );
  }

  let initialData = {
    name: dishQuery.data?.name || '',
    spicy: dishQuery.data?.spicy || false,
    vegetarian: dishQuery.data?.vegetarian || false,
    pescatarian: dishQuery.data?.pescatarian || false,
    isActive: dishQuery.data?.isActive || false,
    portionWeight: dishQuery.data?.portionWeight.toString() || '',
    price: dishQuery.data?.price.toString() || '',
    type: dishQuery.data?.type || '',
  };

  if (dishQuery.data?.picture) {
    initialData.picture = dishQuery.data.picture;
  }

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
            isSaving={isSaving}
          />
        </div>
      </main>
    </div>
  );
};

export default AddDishPage;
