import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeForm from '../../shared/EmployeeForm/EmployeeForm';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const AddPersonnelPage = () => {
  const [data, setData] = useState(null); // State to hold the fetched data

  const { personId } = useParams();

  const handleSubmit = (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint to fetch the data
        const response = await axios.get(`http://localhost:3001/personnel/${personId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Check if data is null before accessing its properties
  const firstName = data?.name?.substring(0, data.name.indexOf(' ')) || '';
  const lastName = data?.name?.substring(data.name.indexOf(' ') + 1) || '';

  return (
    <div>
      <main>
        <h1>Add Personnel</h1>
        {data !== null ? ( // Render the form only if data is not null
          <EmployeeForm
            onSubmit={handleSubmit}
            size={'md'}
            initialState={{
              firstName,
              lastName,
              email: data.email,
              password: '',
              role: data.role,
              gender: data.gender,
              phone: data.phone,
              address: data.address,
              image: data.picture,
            }}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </main>
    </div>
  );
};
export default AddPersonnelPage;
