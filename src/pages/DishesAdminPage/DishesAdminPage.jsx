import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageContainer from 'components/Admin/AdminPageContainer/AdminPageContainer';
import { BASE_URL } from 'api';
import styles from './DishesAdminPage.module.scss';
import Input from 'shared/Input/Input';
import Select from 'shared/Select/Select';

const DishesAdminPage = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [dishesList, setDishesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dishes/restaurant/${restId}`);
        console.log(response.data);
        setDishesList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [restId]);

  const navigateToAddDish = () => {
    navigate(`/admin/${restId}/dishes/new`);
  };

  const handleCategoryChange = () => {
    console.log('k');
  };

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      data={dishesList}
      goToAdd={navigateToAddDish}
    >
      {/* <Select id="type" onChange={handleCategoryChange} size="sm">
          <option value="">All</option>
        </Select> */}
    </AdminPageContainer>
  );
};
export default DishesAdminPage;
