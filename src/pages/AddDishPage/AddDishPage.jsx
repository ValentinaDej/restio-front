import { useQuery } from 'react-query';
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

  const dishQuery = useQuery(['new_dish', dishesId], () => getDishById(dishesId), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!dishesId,
    onError: () => {
      toast.error(ERROR_MESSAGES.fetchDish);
    },
  });

  const IngredientsQuery = useQuery('ingredients', getIngredients, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    onError: () => {
      toast.error(ERROR_MESSAGES.fetchIngredients);
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
        toast.success(SUCCESS_MESSAGES.successfullyUpdated);
      } else {
        await createDish(formData, restId);
        toast.success(SUCCESS_MESSAGES.successfullyCreated);
      }
      handleBack();
    } catch (error) {
      toast.error(ERROR_MESSAGES.savingEditing);
    } finally {
    }
  };

  if (dishQuery.isLoading || IngredientsQuery.isLoading) {
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
    portionWeight: dishQuery.data?.portionWeight || '',
    price: dishQuery.data?.price || '',
    picture: dishQuery.data?.picture || '',
    type: dishQuery.data?.type || '',
  };

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
            ingredientsList={IngredientsQuery.data}
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
