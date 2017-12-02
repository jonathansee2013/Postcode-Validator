import React from 'react';

const SelectState = ({ value, onChange }) => {
  return (
    <div>
      <div className="form-title">State</div>
      <select className="select-field" name="state" type="text"
        value={value} onChange={ event => onChange(event) }>
        <option value="NSW">NSW</option>
        <option value="QLD">QLD</option>
        <option value="SA">SA</option>
        <option value="TAS">TAS</option>
        <option value="VIC">VIC</option>
        <option value="WA">WA</option>
        <option value="NT">NT</option>
        <option value="ACT">ACT</option>
      </select>
    </div>
  )
}

export default SelectState;
