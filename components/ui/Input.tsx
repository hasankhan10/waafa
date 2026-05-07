import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = "", ...props }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="absolute -top-4 left-0 font-label-caps text-label-caps text-on-surface-variant text-[10px]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-transparent border-0 border-b border-surface-dim focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder:text-surface-dim transition-colors duration-300 ${className}`}
        {...props}
      />
    </div>
  );
};
