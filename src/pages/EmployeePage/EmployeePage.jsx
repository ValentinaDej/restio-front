import React from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { BASE_URL } from 'api';
import toast from 'react-hot-toast';
import { getPersonnel } from '../../api/personnel';

const EmployeePage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const navigateToAddEmpl = () => {
    navigate(`/${restId}/admin/personnel/new`);
  };

  const deleteEmployeeMutation = useMutation((employeeId) =>
    axios.delete(`${BASE_URL}/personnel/${employeeId}`, {
      data: { restaurant_id: restId },
    })
  );

  const { data, isLoading, refetch } = useQuery('personnel', () => getPersonnel(restId), {
    onError: () => {
      toast.error('Error fetching personnel data');
    },
  });

  const handleDelete = async (employeeId) => {
    try {
      // await deleteEmployeeMutation.mutateAsync(employeeId);
      await toast.promise(deleteEmployeeMutation.mutateAsync(employeeId), {
        loading: 'Deleting...',
        success: 'Employee deleted successfully',
        error: 'Error deleting employee',
      });
      await refetch();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <AdminPageContainer
      title="Personnel"
      variant="employee"
      goToAdd={navigateToAddEmpl}
      handleDelete={handleDelete}
      data={data}
      isLoading={isLoading}
    />
  );
};
export default EmployeePage;
