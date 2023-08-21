import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Text } from 'shared';
import DraggableIngredient from './DraggableIngredient/DraggableIngredient';
import classes from './SortIngredients.module.scss';

const SortIngredients = ({ selectedIngredients, moveIngredient }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.field__wrapper}>
        <Text mode="p" textAlign="left" fontSize={14} fontWeight={600}>
          Sort Ingredients:
        </Text>
      </div>

      <div className={classes.section}>
        {Array.from(selectedIngredients.entries()).map(([ingredientId, ingredientName], index) => (
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

export default SortIngredients;
