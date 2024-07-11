import React from 'react';
import moment from 'moment';

function InputComponent ({ type, id, label,customClass, value, onChange, placeholder, required,isdisabled}){
  // const currentDate = new Date().toISOString().split('T')[0];
  const currentDate = moment().format('YYYY-MM-DD'); // Get the current date in YYYY-MM-DD format
  const formattedValue = type === 'date' ? moment(value).format('YYYY-MM-DD') : value;
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        className={customClass}
        value={formattedValue}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={isdisabled}
        max={currentDate} 
      />
    </div>
  );
};
export default InputComponent