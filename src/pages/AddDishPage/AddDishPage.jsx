import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import DishForm from 'shared/DishForm/DishForm';
import Button from 'shared/Button/Button';
import Title from 'shared/Title/Title';
import Loader from 'shared/Loader/Loader';

import { getDishById } from '../../api/dish';
import styles from './AddDishPage.module.scss';

const AddDishPage = () => {
  const { personId, restId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useQuery(['new_dish', dishId], () => getDishById(dishId), {
    enabled: !!dishId,
    onError: () => {
      toast.error('Error fetching dish data');
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', formData);
      if (personId) {
        await updatePersonnel(personId, formData, restId);
        toast.success('Personnel updated successfully');
      } else {
        await createPersonnel(formData, restId);
        toast.success('Personnel added successfully');
      }
      handleBack();
    } catch (error) {
      toast.error('Error saving or editing personnel');
      console.error('Error saving personnel:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className={styles.loadingWrapper}>
        <Loader size={'lg'} />
      </main>
    );
  }

  return (
    <div>
      <main className={styles.addDishContainer}>
        <div className={styles.formWrapper}>
          {/* Back button in one line with the Title */}
          <div className={styles.header}>
            <Button mode={'outlined'} nClick={handleBack}>
              Back
            </Button>
            <Title>Add Dish</Title>
          </div>
          <DishForm onSubmit={handleSubmit} />
          {/* onSubmit={handleSubmit} size={'md'} initialState={initialData}  */}
        </div>
      </main>
    </div>
  );
  // return <DishForm />;
};

export default AddDishPage;
