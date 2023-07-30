import React, { useState } from 'react';
import Select from 'shared/Select/Select';
import Input from 'shared/Input/Input';
import Text from 'shared/Text/Text';
import { FaSearch } from 'react-icons/fa';

import classes from '../DishForm.module.scss';
import * as initialData from '../InitialState';

const DishIngredients = ({
  selectedIngredients,
  setSelectedIngredients,
  handleRemoveIngredient,
  handleIngredientChange,
  selectedType,
  handleTypeChange,
  filteredIngredients,
  errors,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const enteredIngredient = event.target.value;
      const matchedIngredient = filteredIngredients.find(
        (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
      );

      if (matchedIngredient) {
        const newSelectedIngredients = new Set(selectedIngredients);
        newSelectedIngredients.add(matchedIngredient.id);
        setSelectedIngredients(newSelectedIngredients);
        setInputValue('');
      }
    }
  };

  const handleAddIngredient = () => {
    const matchedIngredient = initialData.ingredientsList.find(
      (ingredient) => ingredient.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (matchedIngredient) {
      setSelectedIngredients((prevIngredients) => [...prevIngredients, matchedIngredient]);
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredIngredientsToShow = filteredIngredients.filter((ingredient) => {
    const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
    const isSelectedTypeAll = selectedType === '';
    const isSelectedTypeMatching = ingredient.type === selectedType;
    return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
  });

  return (
    <>
      <div className={classes.column}>
        <div className={classes.field__wrapper}>
          <Select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="">All</option>
            {initialData.typesOfIngredients.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <div className={classes.field__wrapper}>
          <select
            className={classes.section}
            name="Ingredients"
            multiple={true}
            onChange={handleIngredientChange}
            value={selectedIngredients}
          >
            {filteredIngredientsToShow.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.field__wrapper}>
          <div className={classes.input_wrapper}>
            <Input
              type="text"
              name="ingredient"
              placeholder="Your ingredient"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <FaSearch onClick={handleAddIngredient} className={classes.input_icon} />
          </div>
        </div>

        <label>Selected Ingredients:</label>
        <ul>
          {Array.from(selectedIngredients).map((ingredientId) => {
            const ingredient = initialData.ingredientsList.find((ing) => ing.id === ingredientId);
            return (
              <li key={ingredientId}>
                {ingredient ? ingredient.name : 'Unknown Ingredient'}
                <button onClick={() => handleRemoveIngredient(ingredientId)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
      {errors.ingredients && (
        <Text mode="p" textAlign="left" fontSize={8} fontWeight={400}>
          {errors.ingredients.message}
        </Text>
      )}
    </>
  );
};

export default DishIngredients;

// import React, { useState, useRef } from 'react';
// import Select from 'shared/Select/Select';
// import Text from 'shared/Text/Text';
// import { FaSearch } from 'react-icons/fa';

// import classes from '../DishForm.module.scss';
// import classesInput from '../../Input/Input.module.scss';
// import * as initialData from '../InitialState';

// const DishIngredients = ({
//   selectedIngredients,
//   setSelectedIngredients,
//   handleRemoveIngredient,
//   handleIngredientChange,
//   selectedType,
//   handleTypeChange,
//   filteredIngredients,
//   errors,
// }) => {
//   const [inputValue, setInputValue] = useState('');

//   const inputRef = useRef();

//   const handleInputKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       const enteredIngredient = inputRef.current.innerText;
//       if (enteredIngredient.trim()) {
//         const matchedIngredient = filteredIngredients.find(
//           (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
//         );

//         if (matchedIngredient) {
//           const newSelectedIngredients = new Set(selectedIngredients);
//           newSelectedIngredients.add(matchedIngredient.id);
//           setSelectedIngredients(newSelectedIngredients);
//           setInputValue('');
//           inputRef.current.innerText = '';
//         }
//       }
//     }
//   };

//   const handleAddIngredient = () => {
//     const enteredIngredient = inputRef.current.innerText;
//     if (enteredIngredient.trim()) {
//       const matchedIngredient = initialData.ingredientsList.find(
//         (ingredient) => ingredient.name.toLowerCase() === enteredIngredient.toLowerCase()
//       );

//       if (matchedIngredient) {
//         setSelectedIngredients((prevIngredients) => [...prevIngredients, matchedIngredient]);
//         setInputValue('');
//       }
//     }
//   };

//   const handleInputChange = () => {
//     setInputValue(inputRef.current.innerText);
//   };

//   const filteredIngredientsToShow = filteredIngredients.filter((ingredient) => {
//     const nameMatchesInput = ingredient.name.toLowerCase().includes(inputValue.toLowerCase());
//     const isSelectedTypeAll = selectedType === '';
//     const isSelectedTypeMatching = ingredient.type === selectedType;
//     return (isSelectedTypeAll || isSelectedTypeMatching) && nameMatchesInput;
//   });

//   return (
//     <>
//       <div className={classes.column}>
//         <div className={classes.field__wrapper}>
//           <Select id="type" value={selectedType} onChange={handleTypeChange}>
//             <option value="">All</option>
//             {initialData.typesOfIngredients.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </Select>
//         </div>
//         <div className={classes.field__wrapper}>
//           <Select
//             name="Ingredients"
//             multiple={true}
//             onChange={handleIngredientChange}
//             value={selectedIngredients}
//           >
//             {filteredIngredientsToShow.map((ingredient) => (
//               <option key={ingredient.id} value={ingredient.id}>
//                 {ingredient.name}
//               </option>
//             ))}
//           </Select>
//         </div>
//       </div>
//       <div className={classes.column}>
//         <div className={classes.field__wrapper}>
//           <div className={classes.input_wrapper}>
//             <div className={classesInput.label}></div>
//             {/* <div
//               ref={inputRef}
//               contentEditable
//               className={classesInput.input}
//               placeholder="Your ingredient"
//               onKeyDown={handleInputKeyDown}
//               onInput={handleInputChange}
//             > */}
//             <input
//               ref={inputRef}
//               type="text"
//               className={classesInput.input}
//               placeholder="Your ingredient"
//               value={inputValue}
//               onChange={handleInputChange}
//               onKeyDown={handleInputKeyDown}
//             />
//             <FaSearch onClick={handleAddIngredient} className={classesInput.input_icon} />
//             {/* </div> */}
//           </div>
//         </div>
//         <label>Selected Ingredients:</label>
//         <ul>
//           {Array.from(selectedIngredients).map((ingredientId) => {
//             const ingredient = initialData.ingredientsList.find((ing) => ing.id === ingredientId);
//             return (
//               <li key={ingredientId}>
//                 {ingredient ? ingredient.name : 'Unknown Ingredient'}
//                 <button onClick={() => handleRemoveIngredient(ingredientId)}>Remove</button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       {errors.ingredients && (
//         <Text mode="p" textAlign="left" fontSize={8} fontWeight={400}>
//           {errors.ingredients.message}
//         </Text>
//       )}
//     </>
//   );
// };

// export default DishIngredients;
