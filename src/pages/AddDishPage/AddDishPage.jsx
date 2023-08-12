import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import DishForm from 'shared/DishForm/DishForm';
import Button from 'shared/Button/Button';
import Title from 'shared/Title/Title';
import Loader from 'shared/Loader/Loader';

import { DISH_CATEGORIES } from 'utils/constants';

import { getDishById, createDish } from '../../api/dish';
import { getIngridients } from '../../api/ingridient';
import styles from './AddDishPage.module.scss';

const AddDishPage = () => {
  const { dishId, restId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { data, isLoading } = useQuery(['new_dish', dishId], () => getDishById(dishId), {
  //   enabled: !!dishId,
  //   onError: () => {
  //     toast.error('Error fetching dish data');
  //   },
  // });

  const {
    data: ingridients,
    isLoading,
    error,
  } = useQuery('ingredients', getIngridients, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', formData);
      if (dishId) {
        // await updateDish(dishId, formData, restId);
        toast.success('Dish updated successfully');
      } else {
        await createDish(formData, restId);
        toast.success('Dish added successfully');
      }
      handleBack();
    } catch (error) {
      toast.error('Error saving or editing dish');
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <main className={styles.loadingWrapper}>
  //       <Loader size={'lg'} />
  //     </main>
  //   );
  // }

  return (
    <div>
      <main className={styles.addDishContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <Button mode={'outlined'} onClick={handleBack}>
              Back
            </Button>
            <Title>Create dish</Title>
          </div>
          <DishForm onSubmit={handleSubmit} category={DISH_CATEGORIES} ingridients={ingridients} />
          {/*  size={'md'}  */}
        </div>
      </main>
    </div>
  );
};

export default AddDishPage;
