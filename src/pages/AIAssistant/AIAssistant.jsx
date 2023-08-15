import React, { useState } from 'react';
import styles from './AIAssistant.module.scss';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import Title from '../../shared/Title/Title';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { FcCancel } from '@react-icons/all-files/fc/FcCancel';
import { FcAssistant } from '@react-icons/all-files/fc/FcAssistant';
import { FcMoneyTransfer } from '@react-icons/all-files/fc/FcMoneyTransfer';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { openai } from '../../api/openai';
import Loader from '../../shared/Loader/Loader';
import { FiDollarSign } from '@react-icons/all-files/fi/FiDollarSign';

const AIAssistant = () => {
  const { restId } = useParams();
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

  const handleStepClick = (clickedStep) => {
    if (clickedStep <= step) {
      setStep(clickedStep);
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      if (answers.budget > 5) {
        setLoading(true); // Show loader
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
          setResponse(response.data.response.text);
          setLoading(false); // Hide loader
          setStep(step + 1);
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
              <div className={styles.inputField}>
                <Input
                  type="number"
                  value={answers.budget}
                  onChange={(e) => setAnswers({ ...answers, budget: e.target.value })}
                />
              </div>
              <div className={styles.dollarIcon}>
                <FiDollarSign size={`20`} />
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
          </div>
        );
      default:
        return null;
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
