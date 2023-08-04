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
  const [searchText, setSearchText] = useState('');
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

  const handleChange = (e) => {
    const { value } = e.target;
    const normalizedValue = value.trim();
    setSearchText(normalizedValue);
  };

  const handleCategoryChange = () => {
    console.log('k');
  };

  const filterDishesList = dishesList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <AdminPageContainer
      title="Dishes list"
      variant="dish"
      data={filterDishesList}
      goToAdd={navigateToAddDish}
    >
      <div className={`${styles.input__container}`}>
        <Input
          type="text"
          name="search"
          value={searchText}
          onChange={handleChange}
          placeholder="Search dish..."
          size="md"
          className={`${styles.input}`}
        />
        {/* <Select id="type" onChange={handleCategoryChange} size="sm">
          <option value="">All</option>
        </Select> */}
      </div>
    </AdminPageContainer>
  );
};
export default DishesAdminPage;
