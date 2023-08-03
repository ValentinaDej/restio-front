import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';

const EmployeePage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/personnel/restaurant/${restId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const navigateToAddEmpl = () => {
    navigate(`/admin/${restId}/personnel/new`);
  };

  const { data } = useQuery('personnel', fetchData);

  return (
    <AdminPageContainer
      title="Personnel"
      variant="employee"
      onClick={navigateToAddEmpl}
      data={data}
    />
  );
};
export default EmployeePage;
