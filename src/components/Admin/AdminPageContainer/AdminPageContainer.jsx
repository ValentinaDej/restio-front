import Title from 'shared/Title/Title';
import styles from './AdminPageContainer.module.scss';
import EmployeeCard from 'shared/EmployeeCard/EmployeeCard';
import EmptyCard from 'shared/EmptyCard/EmptyCard';
import { useNavigate, useParams } from 'react-router-dom';
import Input from 'shared/Input/Input';
import { useState } from 'react';
import Loader from 'shared/Loader/Loader';

const value = {
  employee: 'personnel',
  dish: 'dishes',
};

const AdminPageContainer = ({
  title,
  variant,
  handleDelete,
  goToAdd,
  data,
  children,
  isLoading,
}) => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    const normalizedValue = value.trim();
    setSearchText(normalizedValue);
  };

  const navigateToEdit = (id) => {
    navigate(`/admin/${restId}/${value[variant]}/edit/${id}`);
  };

  const filterList = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={styles['personnel-container']}>
      <Title textAlign={'left'}>{title}</Title>
      <hr className={styles.divider} />
      {isLoading ? (
        <Loader size="sm" />
      ) : (
        <>
          <div className={`${styles.input__section}`}>
            <Input
              type="text"
              name="search"
              value={searchText}
              onChange={handleChange}
              placeholder="Search..."
              size="md"
              className={`${styles.input}`}
            />
            {children}
          </div>
          <ul className={`${styles.menu_wrapper}`}>
            <li key={`empty`} className={styles.card_wrapper}>
              <EmptyCard text={variant} mode={`outlined`} onClick={goToAdd}></EmptyCard>
            </li>
            {filterList &&
              filterList.length > 0 &&
              filterList.map((item) => {
                return (
                  <li key={item._id} className={styles.card_wrapper}>
                    <EmployeeCard
                      data={item}
                      mode={'outlined'}
                      alt={`Employee ${item.name}`}
                      src={item.picture}
                      handleEdit={() => navigateToEdit(item._id)}
                      handleDelete={() => handleDelete(item._id)}
                    >
                      {variant === 'employee' && (
                        <>
                          <p className={styles.employee_name}>{item.name}</p>
                          <p className={styles.employee_subinfo}>{item.role}</p>
                          <p className={styles.employee_subinfo}>{item.phone}</p>
                        </>
                      )}
                      {variant === 'dish' && (
                        <>
                          <p className={styles.employee_name}>{item.name}</p>
                          <p className={styles.employee_subinfo}>$ {item.price}</p>
                        </>
                      )}
                    </EmployeeCard>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminPageContainer;
