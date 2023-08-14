import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { BASE_URL, instance } from 'api';
import toast from 'react-hot-toast';

const EmployeePage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const navigateToAddEmpl = () => {
    navigate(`/${restId}/admin/personnel/new`);
  };

  const deleteEmployeeMutation = useMutation((employeeId) =>
    instance.delete(`${BASE_URL}/personnel/${employeeId}`, {
      data: { restaurant_id: restId },
    })
  );

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
    />
  );
};
export default EmployeePage;
