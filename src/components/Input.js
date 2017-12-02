import React from 'react';

const Input = ({ name, value, onChange }) => {
  return (
    <div>
      <div className="form-title">{name}</div>
        <input
          className="form-field"
          name={name}
          type="text"
          value={value}
          onChange={ event => onChange(event)}
          required />
    </div>
  )
}

export default Input;
