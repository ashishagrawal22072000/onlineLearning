import React from "react";

const Index = ({ label, name, value, options, onChange, error, onBlur }) => {
  return (
    <div className="d-flex flex-column mb-3">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        className="form-select p-2"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="">Select {label || name}</option>
        {options?.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger mt-1">{error}</p>}
    </div>
  );
};

export default Index;
