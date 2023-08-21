import { useState } from 'react';
import { classNames } from 'helpers/classNames';
import { DropDown } from 'shared';
import cls from './Calendar.module.scss';

const monthOptions = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
];

export const Calendar = ({ onChange, newDate }) => {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.value));
    setSelectedDay(1);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.value));
    setSelectedDay(1);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    onChange(new Date(selectedYear, selectedMonth, day));
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(new Date(selectedYear, selectedMonth, 1));
    const startDay = startDayOfMonth(new Date(selectedYear, selectedMonth, 1));
    const days = [];

    for (let i = 1; i <= totalDays + startDay; i++) {
      if (i > startDay) {
        days.push(i - startDay);
      }
    }

    return days.map((day, index) => {
      const currentDate = new Date();
      const selectedDate = new Date(selectedYear, selectedMonth, day);

      const isPastDate = selectedDate <= currentDate;

      return (
        <div
          key={index}
          className={classNames(cls.calendarDay, {
            [cls.selected]: day === selectedDay,
            [cls.disabled]: !isPastDate,
          })}
          onClick={() => (isPastDate ? handleDayClick(day) : null)}
        >
          {day}
        </div>
      );
    });
  };

  const { label } = monthOptions.find((el) => el.value === selectedMonth);

  return (
    <>
      <div className={cls.calendar}>
        <div className={cls.calendarHeader}>
          <DropDown options={monthOptions} onSelect={handleMonthChange} defaultValue={label} />
          <DropDown
            options={Array.from(
              { length: new Date().getFullYear() - 2014 },
              (_, i) => 2015 + i
            ).map((year) => ({ value: year, label: year.toString() }))}
            onSelect={handleYearChange}
            defaultValue={selectedYear}
          />
        </div>
        <div className={cls.calendarGrid}>
          <div className={cls.dayLabel}>Sun</div>
          <div className={cls.dayLabel}>Mon</div>
          <div className={cls.dayLabel}>Tue</div>
          <div className={cls.dayLabel}>Wed</div>
          <div className={cls.dayLabel}>Thu</div>
          <div className={cls.dayLabel}>Fri</div>
          <div className={cls.dayLabel}>Sat</div>
          {renderCalendar()}
        </div>

        <div className={cls.selectedDate}>
          {newDate && (
            <>
              Selected Date: {newDate.getMonth() + 1}/{newDate.getDate()}/{newDate.getFullYear()}
            </>
          )}
        </div>
      </div>
    </>
  );
};
