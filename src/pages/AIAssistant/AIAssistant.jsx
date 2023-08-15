import React, { useState } from 'react';
import styles from './AIAssistant.module.scss';
import Button from '../../shared/Button/Button';
import Title from '../../shared/Title/Title';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { FcCancel } from '@react-icons/all-files/fc/FcCancel';
import { FcAssistant } from '@react-icons/all-files/fc/FcAssistant';
import { FcMoneyTransfer } from '@react-icons/all-files/fc/FcMoneyTransfer';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { openai } from '../../api/openai';
import Loader from '../../shared/Loader/Loader';
import css from '../MenuPage/MenuPage.module.scss';
import DishCard from '../../shared/DishCard/DishCard';
import Cart from '../../components/Cart/Cart';

const AIAssistant = () => {
  const { restId, tableId } = useParams();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    isVegan: false,
    likeSpicy: false,
    isPasc: false,
    wantHealthy: false,
    wantDrink: false,
    budget: 0,
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([
    {
      _id: '64d9ced6ec2a03efaaad15b0',
      name: 'Pizza Chelentano',
      ingredients: [
        {
          _id: '64c68ff222d062ab971d5617',
          name: 'Sausages',
          type: 'meat product',
        },
        {
          _id: '64c68ff222d062ab971d5624',
          name: 'Tomato Puree',
          type: 'tomato',
        },
        {
          _id: '64c68ff222d062ab971d5619',
          name: 'Cheese',
          type: 'milk product',
        },
        {
          _id: '64c68ff222d062ab971d5613',
          name: 'Mushrooms',
          type: 'vegetables',
        },
        {
          _id: '64c68ff222d062ab971d5618',
          name: 'Salt',
        },
        {
          _id: '64c68ff222d062ab971d5610',
          name: 'Chicken',
          type: 'fowl',
        },
      ],
      picture: 'IMG_20200410_103000 (1).jpg',
      type: 'Pizza',
      spicy: false,
      vegetarian: false,
      pescatarian: false,
      portionWeight: 500,
      price: 15,
      isActive: true,
      createdAt: '2023-08-14T06:51:02.375Z',
      updatedAt: '2023-08-15T13:53:48.074Z',
      __v: 0,
    },
    {
      _id: '64da0f174574e1e22e9c0a5d',
      name: 'Olivier2',
      ingredients: [
        {
          _id: '64c68ff222d062ab971d5614',
          name: 'Olive Oil',
          type: 'oil',
        },
        {
          _id: '64c68ff222d062ab971d561c',
          name: 'Sour Cream',
          type: 'milk product',
        },
      ],
      picture: 'Olivier.jpg',
      type: 'Salads',
      spicy: false,
      vegetarian: false,
      pescatarian: true,
      portionWeight: 350,
      price: 2,
      isActive: true,
      createdAt: '2023-08-14T11:25:11.883Z',
      updatedAt: '2023-08-14T11:25:11.883Z',
      __v: 0,
    },
  ]);

  const handleStepClick = (clickedStep) => {
    if (clickedStep <= step) {
      setStep(clickedStep);
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      if (answers.budget > 5) {
        setLoading(true); // Show loader
        setStep(step + 1);
        try {
          const response = await openai(
            restId,
            answers.isVegan,
            answers.likeSpicy,
            answers.isPasc,
            answers.wantHealthy,
            answers.wantDrink,
            answers.budget
          );
          console.log('text', response);
          setResponse(response.data.textBefore);
          setDishes(response.data.dishes);
          setLoading(false); // Hide loader
        } catch (error) {
          setLoading(false); // Hide loader in case of error
          console.error('Error fetching response:', error);
          toast.error('An error occurred while fetching response');
        }
      } else {
        toast.error('Budget must be greater than 5');
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBudgetChange = (value) => {
    setAnswers({ ...answers, budget: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <Title className={styles.text}>
              Hello, I am your AI assistant <FcAssistant />. I will help you to make a best meal you
              ever had. I need is some information about you. Please, answer some questions and Bon
              Appetit!
            </Title>
            <div className={styles.questionContent}>
              <p className={styles.text}>
                Are you a vegetarian? {answers.isVegan ? <FcApproval /> : <FcCancel />}
              </p>
              <Button size={`sm`} onClick={() => setAnswers({ ...answers, isVegan: true })}>
                Yes
              </Button>
              <Button
                mode={`outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, isVegan: false })}
              >
                No
              </Button>
            </div>
            <div className={styles.questionContent}>
              <p className={styles.text}>
                Are you a pescatarian? {answers.isPasc ? <FcApproval /> : <FcCancel />}
              </p>
              <Button size={`sm`} onClick={() => setAnswers({ ...answers, isPasc: true })}>
                Yes
              </Button>
              <Button
                mode={`outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, isPasc: false })}
              >
                No
              </Button>
            </div>
            <div className={styles.questionContent}>
              <p className={styles.text}>
                Do you like spicy food? {answers.likeSpicy ? <FcApproval /> : <FcCancel />}
              </p>
              <Button size={`sm`} onClick={() => setAnswers({ ...answers, likeSpicy: true })}>
                Yes
              </Button>
              <Button
                mode={`outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, likeSpicy: false })}
              >
                No
              </Button>
            </div>
            <div className={styles.questionContent}>
              <p className={styles.text}>
                Do you want a healthy meal? {answers.wantHealthy ? <FcApproval /> : <FcCancel />}
              </p>
              <Button size={`sm`} onClick={() => setAnswers({ ...answers, wantHealthy: true })}>
                Yes
              </Button>
              <Button
                mode={`outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, wantHealthy: false })}
              >
                No
              </Button>
            </div>
            <div className={styles.questionContent}>
              <p className={styles.text}>
                Would you like a drink? {answers.wantDrink ? <FcApproval /> : <FcCancel />}
              </p>
              <Button size={`sm`} onClick={() => setAnswers({ ...answers, wantDrink: true })}>
                Yes
              </Button>
              <Button
                mode={`outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, wantDrink: false })}
              >
                No
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <p className={styles.text}>
              What is your budget? <FcMoneyTransfer />
            </p>
            <div className={styles.budgetInput}>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={1}
                  value={answers.budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                />
              </div>
              <div className={styles.budgetValue}>
                <span>{answers.budget}$</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <div className={styles.assistantLogo}>
              <FcAssistant size={`50`} />
            </div>
            {loading ? <Loader size={`md`} /> : <p className={styles.responseText}>{response}</p>}
            <ul className={styles.list}>
              {dishes?.map(({ _id, picture, price, portionWeight, ingredients, name }) => (
                <li className={styles.list__item} key={_id}>
                  <DishCard
                    id={_id}
                    src={picture}
                    title={name}
                    ingredients={ingredients}
                    weight={portionWeight}
                    price={price}
                    link={`/${restId}/${tableId}/${_id}`}
                  />
                </li>
              ))}
            </ul>
            <Cart />
          </div>
        );
      default:
        return <Loader />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formStepper}>
        <div className={styles.stepIndicator}>
          <div
            className={`${styles.stepBubble} ${step === 1 ? styles.activeStep : ''}`}
            onClick={() => handleStepClick(1)}
          >
            1
          </div>
          <div
            className={`${styles.stepBubble} ${step === 2 ? styles.activeStep : ''}`}
            onClick={() => handleStepClick(2)}
          >
            2
          </div>
          <div
            className={`${styles.stepBubble} ${step === 3 ? styles.activeStep : ''}`}
            onClick={() => handleStepClick(3)}
          >
            3
          </div>
        </div>
        <div className={styles.centerContent}>
          {renderStep()}
          <div className={styles.nextBtn}>
            {step < 3 && (
              <Button disabled={loading} onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
