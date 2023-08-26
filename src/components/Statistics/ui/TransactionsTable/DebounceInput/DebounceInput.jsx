import { useEffect, useState } from 'react';
import { classNames } from 'helpers/classNames';
import cls from '../TableBtns/TableBtns.module.scss';

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 300,
  className,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classNames(cls.input, {}, [className])}
    />
  );
};
