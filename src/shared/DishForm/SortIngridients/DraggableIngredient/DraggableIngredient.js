import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import classes from './DraggableIngredient.module.scss';

const DraggableIngredient = ({ ingredientId, ingredientName, index, moveIngredient, showIcon }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'INGREDIENT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      const isMovingUp = dragIndex > hoverIndex && hoverClientY < hoverMiddleY;
      const isMovingDown = dragIndex < hoverIndex && hoverClientY > hoverMiddleY;
      const isMovingLeft = dragIndex > hoverIndex && hoverClientX < hoverMiddleX;
      const isMovingRight = dragIndex < hoverIndex && hoverClientX > hoverMiddleX;

      if (isMovingUp || isMovingDown || isMovingLeft || isMovingRight) {
        moveIngredient(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'INGREDIENT',
    item: () => {
      return { ingredientId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`${classes.draggableIngredient} ${isDragging ? classes.isDragging : ''}`}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      {ingredientName}
    </div>
  );
};

export default DraggableIngredient;
