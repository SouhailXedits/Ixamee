import dayjs from 'dayjs';
import React, { useState } from 'react';
const getDiff = (date1: any, date2: any) => {
  date1 = dayjs(date1);
  date2 = dayjs(date2);
  const diffMinutes = date1.diff(date2, 'minute');
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return { hours: hours.toString().padStart(2, '0'), minutes: minutes.toString().padStart(2, '0') };
};
function DurationPicker({ formik, name, start }: any) {
  const diff = getDiff(formik.values[name], start);
  const [hours, setHours] = useState(diff.hours || '00');
  const [minutes, setMinutes] = useState(diff.minutes || '00');

  const formatValue = (inputValue: any) => {
    const numericValue = inputValue.replace(/\D/g, '');

    let formattedValue = parseInt(numericValue, 10);
    if (isNaN(formattedValue)) {
      formattedValue = 0;
    } else if (formattedValue < 0) {
      formattedValue = 0;
    } else if (formattedValue > 99) {
      formattedValue = 99;
    }

    return formattedValue.toString().padStart(2, '0');
  };
  const handleInputChange = (event: any, setState: any, type: string) => {
    const newValue: any = formatValue(event.target.value);

    const formattedDate = dayjs(start)
      .add(Number(type === 'hr' ? newValue : hours), 'hour')
      .add(Number(type === 'min' ? newValue : minutes), 'minute');

    formik.setFieldValue(name, formattedDate.toISOString());
    setState(newValue);
  };
  return (
    <div className="duration-picker">
      <div className="duration-field">
        <input
          value={hours}
          onChange={(e: any) => handleInputChange(e, setHours, 'hr')}
          type="number"
          min={0}
          max={99}
          className="duration-input hours"
        />
        <span className="suffix-hours">hr</span>
      </div>
      <div className="duration-field">
        <input
          type="number"
          onChange={(e: any) => handleInputChange(e, setMinutes, 'min')}
          min={0}
          max={59}
          value={minutes}
          className="duration-input minutes"
        />
        <span className="suffix-minutes">min</span>
      </div>
    </div>
  );
}

export default DurationPicker;
