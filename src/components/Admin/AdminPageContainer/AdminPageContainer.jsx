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
import { useMediaQuery } from 'react-responsive';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });

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
        onError: (error) => {
          console.error(`Error fetching ${variant}:`, error);
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
    setSearchText(normalizedValue);
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
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className={styles['personnel-container']}>
      <Title textAlign={'left'}>{title}</Title>
      <hr className={styles.divider} />

      <div className={`${styles.input__section}`}>
        <div style={{ position: 'relative', display: 'flex', width: '100%', gap: '10px' }}>
          <Input
            type="text"
            name="search"
            value={searchText}
            onChange={handleChange}
            placeholder="Search..."
            size="md"
            className={`${styles.input}`}
          />

          {isMobile && (
            <>
              <button
                type="button"
                onClick={handleSearch}
                className={`${styles.search__searchBtn}`}
              >
                <BiSearch size={24} />
              </button>
              <button type="button" onClick={handleClear} className={`${styles.search__clearBtn}`}>
                <AiOutlineCloseCircle size={24} />
              </button>
            </>
          )}
        </div>
        <div className={`${styles.search__section}`}>
          {isTablet && (
            <>
              <Button size={`sm`} onClick={handleSearch}>
                Search
              </Button>
              <Button size={`sm`} mode="outlined" onClick={handleClear}>
                Clear
              </Button>
            </>
          )}

          {children}
        </div>
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
                  <p className={styles.employee_name}>{item.name}</p>
                  <p className={styles.employee_subinfo}>{item.role}</p>
                  <p className={styles.employee_subinfo}>{item.phone}</p>
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
                  <p className={styles.employee_name}>{item.name}</p>
                  <p className={styles.employee_subinfo}>${item.price?.toFixed(2)}</p>
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
