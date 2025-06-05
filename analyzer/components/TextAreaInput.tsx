
import React from 'react';
// import { TextAreaInputProps } from '../types'; // Type information is for build time

const TextAreaInput = ({ id, label, value, onChange, placeholder, rows = 10, disabled }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className="block w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none transition-colors duration-150"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
};

export default TextAreaInput;
