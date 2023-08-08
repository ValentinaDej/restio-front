import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { deleteDishById, getDishes } from 'api/dish';
import Select from 'shared/Select/Select';
import { DISH_CATEGORIES } from 'utils/constants';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  const { isLoading, data, refetch } = useQuery(
    ['dishes', category],
    async () => await getDishes(restId, category),
    {
      onError: (error) => {
        toast.error(error.message);
      },

      refetchOnWindowFocus: false, // Disable refetching when the window gains focus
      refetchOnReconnect: false, // Disable refetching when the network reconnects
      refetchInterval: false, // Disable automatic periodic refetching
    }
  );

  const { mutateAsync } = useMutation((dishId) => {
    deleteDishById(dishId, restId);
  });

  const navigateToAddDish = () => {
    navigate(`/admin/${restId}/dishes/new`);
  };

  const handleDelete = async (id, restId) => {
    try {
      await toast.promise(mutateAsync(id, restId), {
        loading: 'Deleting...',
        success: 'Dish deleted successfully',
        error: 'Error deleting dish',
      });
      await refetch();
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleCategory = (e) => {
    const categoryChoose = e.target.value;
    setCategory(categoryChoose);
  };

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      data={data?.data}
      isLoading={isLoading}
      goToAdd={navigateToAddDish}
      handleDelete={handleDelete}
    >
      <Select id="category" value={category} onChange={handleCategory} size="sm" length="sm">
        <option value="">All category</option>
        {DISH_CATEGORIES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </AdminPageContainer>
  );
};
export default DishesAdminPage;
