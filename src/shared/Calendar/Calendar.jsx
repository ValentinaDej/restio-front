import { useState } from 'react';
import cls from './Calendar.module.scss';
import { classNames } from 'helpers/classNames';
import { IconButton } from 'shared/IconButton/IconButton';

export const Calendar = ({ isOpen, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
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
    setSelectedMonth(parseInt(event.target.value));
    setSelectedDay(1);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
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

  return (
    <>
      <div className={cls.calendar}>
        <div className={cls.calendarHeader}>
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
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
          Selected Date: {selectedMonth + 1}/{selectedDay}/{selectedYear}
        </div>
      </div>
    </>
  );
};
