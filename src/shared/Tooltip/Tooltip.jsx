import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Tooltip.module.scss';
import { classNames } from 'helpers/classNames';

export const Tooltip = ({ content, children, postion = 'top' }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={classNames(css.customTooltip)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {isTooltipVisible && (
        <div className={classNames(css.tooltipContent, { [css[postion]]: postion })}>{content}</div>
      )}
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
};
