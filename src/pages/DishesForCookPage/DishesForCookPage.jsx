import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'shared/Card/Card';
import Title from 'shared/Title/Title';
import styles from './DishesForCookPage.module.scss';
import Button from 'shared/Button/Button';
import Status from 'shared/Status/Status';

const statuses = ['Ordered', 'in progress', 'ready'];

const DishesForCookPage = () => {
  const [dishes, setDishes] = useState([]);
  const { restId } = useParams();
  console.log(dishes);

  const handleChangeStatus = (status) => {
    console.log(status);
  };

  useEffect(() => {
    const fetchDishes = async () => {
      const request = await axios.get(
        `http://localhost:3001/orders/${restId}/64ca7527e72e435beb0339f0`
      );

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
              <Status statusCurrent={status.toLowerCase()} className={`${styles.status__title}`} />
              {dishes.length > 0 && (
                <ul className={`${styles.list}`}>
                  {filterDishes(status).map(({ dish, quantity, status }) => {
                    return (
                      <li key={dish._id} className={`${styles.item}`}>
                        <Card
                          mode="cook"
                          src={dish.picture}
                          title={dish.name}
                          quantity={quantity}
                        />
                        <Status
                          statusCurrent={status.toLowerCase()}
                          className={`${styles.status}`}
                        />
                        <div className={`${styles.button__container}`}>
                          <Button
                            onClick={() => handleChangeStatus('In progress')}
                            mode="primary"
                            size="sm"
                            className={`${styles.button__purple}`}
                          >
                            In progress
                          </Button>
                          <Button
                            onClick={() => handleChangeStatus('Ready')}
                            mode="primary"
                            size="sm"
                            className={`${styles.button__green}`}
                          >
                            Ready
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesForCookPage;
