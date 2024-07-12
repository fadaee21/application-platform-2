import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx/lite";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  labelClass?: string;
  inputClass?: string;
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
  (
    {
      state,
      onChange,
      label,
      id,
      onClick,
      icon,
      labelClass,
      inputClass,
      className, // Get the className prop
      ...rest
    },
    ref
  ) => {
    const labelClasses = clsx(
      "block w-full mb-1 text-md font-medium leading-6 text-gray-900 dark:text-slate-300 whitespace-nowrap",
      labelClass
    );
    const inputClasses = clsx(
      "w-full  rounded-md border-0 py-1.5 block shadow-sm ring-1 ring-inset placeholder:text-gray-400 text-sm leading-6 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-slate-300 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset  focus:ring-indigo-400 dark:focus:ring-indigo-500",
      inputClass
    );

    return (
      <>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <div className={`relative w-full ${className}`}> {/* Append the className prop here */}
          <input
            className={inputClasses}
            value={state}
            onChange={onChange}
            id={id}
            name={id}
            ref={ref}
            {...rest}
          />
          {icon && (
            <button
              onClick={onClick}
              type="button"
              aria-label={label}
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-default"
            >
              {icon}
            </button>
          )}
        </div>
      </>
    );
  }
);
