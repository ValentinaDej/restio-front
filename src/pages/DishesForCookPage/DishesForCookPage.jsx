import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from 'shared/Title/Title';
import styles from './DishesForCookPage.module.scss';
import Status from 'shared/Status/Status';
import DishesList from 'components/Cook/DishesList/DishesList';

const statuses = ['Ordered', 'In progress', 'Ready'];

const DishesForCookPage = () => {
  const [dishes, setDishes] = useState([]);
  const { restId } = useParams();
  console.log(dishes);

  const handleChangeStatus = useCallback(
    async (id, status) => {
      const result = await axios.patch(
        `http://localhost:3002/orders/${restId}/64ca7527e72e435beb0339f0/${id}`,
        {
          status,
        }
      );
      console.log(result.data);
      //прописати оновлення стєйту
      setDishes((prevState) =>
        prevState.map((item) => (item.dish._id === id ? { ...item, status } : item))
      );
    },
    [restId, setDishes]
  );

  useEffect(() => {
    const fetchDishes = async () => {
      const request = await axios.get(
        `http://localhost:3002/orders/${restId}/64ca7527e72e435beb0339f0`
      );
      console.log(request.data.data.order);
      setDishes(request.data.data.order.orderItems);
    };

    fetchDishes();
  }, [restId]);

  const filterDishes = (status) => {
    return dishes.filter((item) => item.status === status);
  };

  return (
    <div className="main__container">
      <div className={`${styles.container}`}>
        <Title classname={`${styles.title}`}>Cook Dashboard</Title>
        <div className={`${styles.status__container}`}>
          {statuses.map((status) => (
            <div key={status} className={`${styles.status__card}`}>
              <Status statusCurrent={status} className={`${styles.status__title}`} />
              {dishes.length > 0 && (
                <DishesList dishes={filterDishes(status)} handleChangeStatus={handleChangeStatus} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesForCookPage;
