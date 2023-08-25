import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';

import { AdminPageContainer } from 'components';
import { Select, Loader } from 'shared';
import { DISH_CATEGORIES } from 'utils/constants';
import { deleteDishById } from 'api/dish';
import styles from './DishesAdminPage.module.scss';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [type, setType] = useState('all');
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation((dishId) => {
    deleteDishById(dishId, restId);
  });

  const navigateToAddDish = () => {
    navigate(`/${restId}/admin/dishes/new`);
  };

  const handleDelete = async (id, restId, isActive, name) => {
    try {
      await toast.promise(mutateAsync(id, restId), {
        success: isActive ? `Dish ${name} moved to inactive` : `Dish ${name} moved to active`,
        error: 'Error removing dish',
      });
      await queryClient.refetchQueries(['dishes'], []);
    } catch (error) {
      console.error('Error removing dish:', error);
    }
  };

  const handleCategory = (e) => {
    const categoryChoose = e.target.value;
    setCategory(categoryChoose);
  };

  const handleType = (e) => {
    const typeValue = e.target.value;
    setType(typeValue);
  };

  return isLoading ? (
    <Loader size={'lg'} />
  ) : (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      category={category}
      type={type}
      goToAdd={navigateToAddDish}
      handleDelete={handleDelete}
    >
      <div className={`${styles.select__section}`}>
        <Select
          id="type"
          value={type}
          onChange={handleType}
          size="sm"
          length="sm"
          className={`${styles.select}`}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="noActive">No Active</option>
        </Select>
        <Select
          id="category"
          value={category}
          onChange={handleCategory}
          size="sm"
          length="sm"
          className={`${styles.select__active}`}
        >
          <option value="">All category</option>
          {DISH_CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    </AdminPageContainer>
  );
};
export default DishesAdminPage;
