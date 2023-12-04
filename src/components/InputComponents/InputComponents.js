import React from 'react';

function InputComponent ({ type, id, label,customClass, value, onChange, placeholder, required,isdisabled}){
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        className={customClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={isdisabled}
      />
    </div>
  );
};
export default InputComponent