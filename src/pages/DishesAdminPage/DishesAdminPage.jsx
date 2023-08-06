import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { deleteDishById, fetchDishesList, getDishes } from 'api/dish';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery(
    'fetchDishesList',
    async () => fetchDishesList(restId),
    {
      onError: (error) => {
        toast.error(error.message);
      },
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
