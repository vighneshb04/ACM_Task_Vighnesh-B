import React from 'react';
import './DateSelect.css';

const DateSelect = ({ date, setDate }) => {
  return (
    <input 
      type="date" 
      className="dateSelect"
      value={date} 
      onChange={(e) => setDate(e.target.value)} 
    />
  );
};

export default DateSelect;
