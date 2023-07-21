import React, { memo } from 'react';
import cls from './IconButton.module.scss';

export const IconButton = memo(({ Svg, size = 20, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button className={cls.btn} onClick={handleClick}>
      <Svg size={size} className={cls.icon} />
    </button>
  );
});
