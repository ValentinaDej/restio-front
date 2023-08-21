import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Tooltip.module.scss';

export const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={css.customTooltip}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {isTooltipVisible && <div className={css.tooltipContent}>{content}</div>}
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
};
