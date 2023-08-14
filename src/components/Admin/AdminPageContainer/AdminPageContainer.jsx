import Title from 'shared/Title/Title';
import styles from './AdminPageContainer.module.scss';
import EmployeeCard from 'shared/EmployeeCard/EmployeeCard';
import EmptyCard from 'shared/EmptyCard/EmptyCard';
import { useNavigate, useParams } from 'react-router-dom';
import Input from 'shared/Input/Input';
import { useState } from 'react';
import Loader from 'shared/Loader/Loader';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { getPersonnel } from '../../../api/personnel';
import Button from '../../../shared/Button/Button';
import toast from 'react-hot-toast';

const value = {
  employee: 'personnel',
  dish: 'dishes',
};

const AdminPageContainer = ({
  title,
  variant,
  handleDelete,
  goToAdd,
  initData,
  children,
  isLoading,
}) => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const queryClient = useQueryClient();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['personnel', restId],
    ({ pageParam = 1 }) => getPersonnel({ restId, pageParam, searchText }),
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      onError: (error) => {
        console.error('Error fetching personnel:', error);
        toast.error('Error fetching personnel');
      },
      cacheTime: 10 * 60 * 60,
      staleTime: 15 * 60 * 60,
    }
  );

  if (isLoading) {
    return <Loader size="sm" />;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const normalizedValue = value.trim();
    setSearchText(normalizedValue);
  };

  const navigateToEdit = (id) => {
    navigate(`/${restId}/admin/${value[variant]}/edit/${id}`);
  };

  const filterList = initData?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = () => {
    queryClient.removeQueries(['personnel', restId]); // Invalidate the query cache
    fetchNextPage(1); // Trigger data refetch with the first page
  };

  return (
    <div className={styles['personnel-container']}>
      <Title textAlign={'left'}>{title}</Title>
      <hr className={styles.divider} />

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
        <div className={`${styles.search__section}`}>
          <Button size={`md`} onClick={handleSearch}>
            Search
          </Button>
        </div>
        {children}
      </div>

      <ul className={`${styles.menu_wrapper}`}>
        <li key={`empty`} className={styles.card_wrapper}>
          <EmptyCard text={variant} mode={`outlined`} onClick={goToAdd}></EmptyCard>
        </li>
        {variant === 'employee' &&
          data?.pages?.map((page) =>
            page.personnel.map((item) => (
              <li key={item._id} className={styles.card_wrapper}>
                <EmployeeCard
                  data={item}
                  mode={'outlined'}
                  alt={`Employee ${item.name}`}
                  src={item.picture}
                  handleEdit={() => navigateToEdit(item._id)}
                  handleDelete={() => handleDelete(item._id)}
                >
                  <>
                    <p className={styles.employee_name}>{item.name}</p>
                    <p className={styles.employee_subinfo}>{item.role}</p>
                    <p className={styles.employee_subinfo}>{item.phone}</p>
                  </>
                </EmployeeCard>
              </li>
            ))
          )}
        {variant === 'dish' &&
          filterList &&
          filterList.length > 0 &&
          filterList.map((item) => (
            <li key={item._id} className={styles.card_wrapper}>
              <EmployeeCard
                data={item}
                mode={'outlined'}
                alt={`Dish ${item.name}`}
                src={item.picture}
                handleEdit={() => navigateToEdit(item._id)}
                handleDelete={() => handleDelete(item._id)}
              >
                <>
                  <p className={styles.employee_name}>{item.name}</p>
                  <p className={styles.employee_subinfo}>$ {item.price}</p>
                </>
              </EmployeeCard>
            </li>
          ))}
      </ul>
      {hasNextPage && (
        <div className={`${styles.addMore__section}`}>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminPageContainer;
