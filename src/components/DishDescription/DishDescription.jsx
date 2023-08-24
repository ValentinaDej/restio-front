import { useState, useEffect, useCallback } from 'react';
import { HfInference } from '@huggingface/inference';

import classes from 'pages/DishPage/DishPage.module.scss';
import { Text, Loader } from 'shared';

export const DishDescription = ({ data: dish }) => {
  const [generatedText, setGeneratedText] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const generateText = useCallback(async () => {
    if (dish) {
      const keys = [
        process.env.REACT_APP_HUGGINGFACE_API_KEY,
        process.env.REACT_APP_HUGGINGFACE_API_KEY2,
      ];
      let generatedText = '';
      for (const key of keys) {
        try {
          const hf = new HfInference(key);
          const model = 'declare-lab/flan-alpaca-large';
          const text = `Create exquisite description of ${dish.name}.`;
          const response = await hf.textGeneration({
            model: model,
            inputs: text,
            parameters: { max_new_tokens: 250 },
          });
          let textGen = response.generated_text;
          const lastDotIndex = textGen.lastIndexOf('.');
          generatedText = textGen.substring(0, lastDotIndex + 1);
          break;
        } catch (error) {
          console.error('Error with API key:', key);
        }
      }
      if (generatedText) {
        setGeneratedText(generatedText.split(' '));
        setIsLoaded(true);
      } else {
        console.error('Both API keys failed.');
      }
    }
  }, [dish]);
  useEffect(() => {
    generateText();
  }, [generateText]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index == 0) {
        setCurrentText(generatedText[index] + ' ');
        index++;
      } else if (index < generatedText.length - 1) {
        setCurrentText((prevText) => prevText + generatedText[index] + ' ');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    setCurrentText('');
    return () => clearInterval(interval);
  }, [generatedText]);

  return (
    <div className={classes.AIwrapper}>
      <Text mode="p" classname={`${classes.subtitle} ${classes.AItitle}`}>
        What does AI think about this dish:
      </Text>
      {isLoaded ? (
        <Text mode="p" classname={classes.AItext}>
          {currentText}
          <span className={classes.cursor}></span>
        </Text>
      ) : (
        <div className={classes.loader_AI}>
          <Loader size="sm"></Loader>
        </div>
      )}
    </div>
  );
};
