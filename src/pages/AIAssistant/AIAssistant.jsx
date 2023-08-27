import React, { useState } from 'react';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { FcCancel } from '@react-icons/all-files/fc/FcCancel';
import { FcAssistant } from '@react-icons/all-files/fc/FcAssistant';
import { FcMoneyTransfer } from '@react-icons/all-files/fc/FcMoneyTransfer';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styles from './AIAssistant.module.scss';
import css from '../MenuPage/MenuPage.module.scss';
import { DishCard, Loader, CategoryTabs, Input, Title, Button, DishCardSkeleton } from 'shared';
import { Cart } from 'components';
import { getAllDishes, getDishesForMenu } from 'api/dish';
import { openai } from 'api/openai';

const AIAssistant = () => {
  const { restId, tableId } = useParams();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    isVegan: false,
    likeSpicy: false,
    isPasc: false,
    wantHealthy: false,
    budget: 10,
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setActiveTab] = useState('Salads');
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['dishes', category],
    async ({ pageParam = 1 }) =>
      category === 'All'
        ? await getAllDishes(restId, true, pageParam)
        : await getDishesForMenu(restId, category, true, pageParam),

    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage?.data?.page < lastPage?.data?.totalPages) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },

      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );

  const handleStepClick = (clickedStep) => {
    if (clickedStep <= step) {
      setStep(clickedStep);
    }
  };

  const handleNext = async () => {
    if (step === 3) {
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
            answers.budget
          );
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
              <Button
                mode={answers.isVegan ? `` : `outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, isVegan: true })}
              >
                Yes
              </Button>
              <Button
                mode={answers.isVegan ? `outlined` : ``}
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
              <Button
                mode={answers.isPasc ? `` : `outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, isPasc: true })}
              >
                Yes
              </Button>
              <Button
                mode={answers.isPasc ? `outlined` : ``}
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
              <Button
                mode={answers.likeSpicy ? `` : `outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, likeSpicy: true })}
              >
                Yes
              </Button>
              <Button
                mode={answers.likeSpicy ? `outlined` : ``}
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
              <Button
                mode={answers.wantHealthy ? `` : `outlined`}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, wantHealthy: true })}
              >
                Yes
              </Button>
              <Button
                mode={answers.wantHealthy ? `outlined` : ``}
                size={`sm`}
                onClick={() => setAnswers({ ...answers, wantHealthy: false })}
              >
                No
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <Title className={styles.text}>
              Choose the dishes you like. You can choose anything if you are not sure.
            </Title>
            <p className={styles.text}>
              It`s just a prototype to show the idea of the future development.
            </p>

            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.wrapper}>
                <CategoryTabs mode="outlined" setActiveTab={setActiveTab} activeTab={category} />
                <Cart />
                <ul className={css.list}>
                  {isLoading ? (
                    [1, 2, 3].map((item) => (
                      <li className={css.list__item} key={item}>
                        <DishCardSkeleton />
                      </li>
                    ))
                  ) : (
                    <>
                      {data?.pages?.map((page) =>
                        page?.data?.dishes?.map(
                          ({ _id, picture, price, portionWeight, ingredients, name }) => (
                            <li className={css.list__item} key={_id}>
                              <DishCard
                                id={_id}
                                src={picture}
                                title={name}
                                ingredients={ingredients}
                                weight={portionWeight}
                                price={price}
                                link={`/${restId}/tables/${tableId}/dishes/${_id}`}
                              />
                            </li>
                          )
                        )
                      )}
                    </>
                  )}
                </ul>
                {hasNextPage && (
                  <div className={css.button}>
                    {isFetchingNextPage ? (
                      <Loader />
                    ) : (
                      <Button mode="outlined" size="sm" onClick={() => fetchNextPage()}>
                        Load more
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <p className={styles.text}>
              What is your budget? <FcMoneyTransfer />
            </p>
            <Input
              type="number"
              min={10}
              max={1000}
              step={1}
              value={answers.budget}
              onChange={(e) => handleBudgetChange(e.target.value)}
            />
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
      case 4:
        return (
          <div className={styles.stepContent}>
            <div className={styles.assistantLogo}>
              <FcAssistant size={`50`} />
            </div>
            {loading ? <Loader size={`md`} /> : <p className={styles.responseText}>{response}</p>}
            <ul className={css.list}>
              {dishes?.map(({ _id, picture, price, portionWeight, ingredients, name }) => (
                <li className={css.list__item} key={_id}>
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formStepper}>
        <Button mode="outlined" className={styles.backButton} onClick={handleBack}>
          Back To Menu
        </Button>
        <div className={styles.stepIndicator}>
          <div
            className={`${styles.stepBubble} ${step === 1 ? styles.activeStep : ''}`}
            onClick={() => handleStepClick(1)}
          >
            1
          </div>
          <div
            className={`${styles.prototypeBubble} ${step === 2 ? styles.activeStep : ''}`}
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
          <div
            className={`${styles.stepBubble} ${step === 4 ? styles.activeStep : ''}`}
            onClick={() => handleStepClick(4)}
          >
            4
          </div>
        </div>
        <div className={styles.centerContent}>
          {renderStep()}
          <div className={styles.nextBtn}>
            {step < 4 && (
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
