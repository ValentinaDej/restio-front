import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { BASE_URL } from 'api';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dishes/restaurant/${restId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const navigateToAddDish = () => {
    navigate(`/admin/${restId}/dishes/new`);
  };

  const { data } = useQuery('dishes', fetchData);

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      onClick={navigateToAddDish}
      data={data}
    />
  );
};
export default DishesAdminPage;
