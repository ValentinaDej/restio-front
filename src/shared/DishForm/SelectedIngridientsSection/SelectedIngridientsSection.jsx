import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Text from 'shared/Text/Text';
import DraggableIngredient from '../DraggableIngredient/DraggableIngredient';
import classes from './SelectedIngridientsSection.module.scss';

const SelectedIngridientsSection = ({ selectedIngredients, moveIngredient }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.section}>
        <div className={classes.field__wrapper}>
          <Text mode="p" textAlign="left" fontSize={14} fontWeight={600}>
            Selected ingridients:
          </Text>
        </div>
        {Array.from(selectedIngredients.entries()).map(([ingredientId, ingredientName], index) => (
          // <div key={ingredientId}>{ingredientName}</div>
          <DraggableIngredient
            showIcon={true}
            key={ingredientId}
            ingredientId={ingredientId}
            ingredientName={ingredientName}
            index={index}
            moveIngredient={moveIngredient}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default SelectedIngridientsSection;
