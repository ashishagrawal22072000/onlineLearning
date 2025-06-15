import React from "react";

const index = ({ value, onChange, placeholder, type, error, name, label }) => {
  return (
    <>
      <div className="d-flex flex-column mb-2">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          className="bg-transparent  border border-1 p-3"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <p className="text-danger">{error}</p>
      </div>
    </>
  );
};
export default index;
