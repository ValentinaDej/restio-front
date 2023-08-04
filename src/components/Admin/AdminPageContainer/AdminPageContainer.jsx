import Title from 'shared/Title/Title';
import styles from './AdminPageContainer.module.scss';
import EmployeeCard from 'shared/EmployeeCard/EmployeeCard';
import EmptyCard from 'shared/EmptyCard/EmptyCard';
import { useNavigate, useParams } from 'react-router-dom';

const value = {
  employee: 'personnel',
  dish: 'dishes',
};

const AdminPageContainer = ({ title, variant, onClick, handleDelete, goToAdd, data }) => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const navigateToEdit = (id) => {
    navigate(`/admin/${restId}/${value[variant]}/edit/${id}`);
  };

  return (
    <div className={styles['personnel-container']}>
      <Title textAlign={'left'}>{title}</Title>
      <hr className={styles.divider} />
      <ul className={`${styles.menu_wrapper}`}>
        <li key={`empty`} className={styles.card_wrapper}>
          <EmptyCard text={variant} mode={`outlined`} onClick={goToAdd}></EmptyCard>
        </li>
        {data?.map((item) => {
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
    </div>
  );
};

export default AdminPageContainer;
