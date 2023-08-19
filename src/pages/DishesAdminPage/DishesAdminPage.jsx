import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import Select from 'shared/Select/Select';
import { DISH_CATEGORIES } from 'utils/constants';
import styles from './DishesAdminPage.module.scss';
import { deleteDishById } from '../../api/dish';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [type, setType] = useState('active');

  const queryClient = useQueryClient();

  const location = useLocation();
  const state = location.state;

  if (state && state.shouldUpdate) {
    queryClient.invalidateQueries(['dishes', category, type]);
  }

  useEffect(() => {
    queryClient.invalidateQueries(['dishes', category, type]);
  }, [category, type, queryClient]);

  const { mutateAsync } = useMutation((dishId) => {
    deleteDishById(dishId, restId);
  });

  const navigateToAddDish = () => {
    navigate(`/${restId}/admin/dishes/new`);
  };

  const handleDelete = async (id, restId) => {
    try {
      await toast.promise(mutateAsync(id, restId), {
        loading: 'Removing...',
        success: 'Dish removed from the menu',
        error: 'Error removing dish',
      });
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

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      category={category}
      type={type}
      goToAdd={navigateToAddDish}
      handleDelete={handleDelete}
    >
      <div className={`${styles.select__section}`}>
        <Select id="type" value={type} onChange={handleType} size="sm" length="sm">
          <option value="active">Active</option>
          <option value="noActive">No Active</option>
        </Select>
        <Select id="category" value={category} onChange={handleCategory} size="sm" length="sm">
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
