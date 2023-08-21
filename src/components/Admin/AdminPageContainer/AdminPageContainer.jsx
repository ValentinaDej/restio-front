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
import { getDishes } from '../../../api/dish';

const value = {
  employee: 'personnel',
  dish: 'dishes',
};

const AdminPageContainer = ({
  title,
  variant,
  handleDelete,
  goToAdd,
  children,
  category,
  type,
}) => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const queryClient = useQueryClient();

  const queryKey = variant === 'employee' ? ['personnel', restId] : ['dishes', category, type];

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam = 1 }) =>
        variant === 'employee'
          ? getPersonnel({ restId, pageParam, searchText })
          : getDishes(restId, category, type === 'active', pageParam, searchText),
      {
        getNextPageParam: (lastPage, _pages) => {
          if (lastPage.page < lastPage.totalPages) {
            return lastPage.page + 1;
          }
          return undefined;
        },
        onError: () => {
          toast.error(`Error fetching ${variant}`);
        },
        cacheTime: 10 * 60 * 60,
        staleTime: 15 * 60 * 60,
        refetchOnWindowFocus: false, // Disable refetching when the window gains focus
        refetchOnReconnect: false, // Disable refetching when the network reconnects
        refetchInterval: false, // Disable automatic periodic refetching
      }
    );

  const handleChange = (e) => {
    const { value } = e.target;
    const normalizedValue = value.trim();
    if (/^[a-zA-Z]+$/.test(normalizedValue) || normalizedValue === '') {
      setSearchText(normalizedValue);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const navigateToEdit = (id) => {
    navigate(`/${restId}/admin/${value[variant]}/edit/${id}`);
  };

  const handleSearch = () => {
    queryClient.removeQueries(['personnel', restId]); // Invalidate the employee query cache
    queryClient.removeQueries(['dishes', category, type]); // Invalidate the dishes query cache
    void fetchNextPage(1); // Trigger data refetch with the first page
  };

  const handleClear = () => {
    setSearchText('');
    queryClient.removeQueries(['personnel', restId]); // Invalidate the employee query cache
    queryClient.removeQueries(['dishes', category, type]); // Invalidate the dishes query cache
  };

  const handleDeleteItem = async (id) => {
    try {
      await handleDelete(id, restId);
      await refetch();
    } catch (error) {
      toast.error('Error deleting item');
    }
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
        <div className={`${styles.search__section}`}>
          <Button size={`md`} onClick={handleClear}>
            Clear
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
                  handleDelete={() => handleDeleteItem(item._id)}
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
          data?.pages?.map((page) =>
            page.dishes.map((item) => (
              <li key={item._id} className={styles.card_wrapper}>
                <EmployeeCard
                  data={item}
                  mode={'outlined'}
                  alt={`Dish ${item.name}`}
                  src={item.picture}
                  handleEdit={() => navigateToEdit(item._id)}
                  handleDelete={() => handleDeleteItem(item._id)}
                >
                  <>
                    <p className={styles.employee_name}>{item.name}</p>
                    <p className={styles.employee_subinfo}>$ {item.price}</p>
                  </>
                </EmployeeCard>
              </li>
            ))
          )}
      </ul>
      {hasNextPage && (
        <div className={`${styles.addMore__section}`}>
          <Button mode={'outlined'} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminPageContainer;
