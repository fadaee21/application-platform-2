import React, { TextareaHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx/lite";
import { Field, Label, Textarea } from "@headlessui/react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  state: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  labelClass?: string;
  inputClass?: string;
  height?: string; // Add height prop
}

export const TextareaField = forwardRef<HTMLTextAreaElement, IProps>(
  (
    {
      state,
      onChange,
      label,
      id,
      labelClass,
      inputClass,
      height, // Get the height prop
      ...rest
    },
    ref
  ) => {
    const labelClasses = clsx(
      "block w-full mb-1 text-md font-medium leading-6 text-gray-900 dark:text-slate-300 whitespace-nowrap",
      labelClass
    );
    const inputClasses = clsx(
      "w-full rounded-md resize-none border-0 py-1.5 block shadow-sm ring-1 ring-inset placeholder:text-gray-400 text-sm leading-6 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-slate-300 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-400 dark:focus:ring-indigo-500",
      inputClass
    );

    return (
      <Field>
        <Label htmlFor={id} className={labelClasses}>
          {label}
        </Label>
        <Textarea
          className={inputClasses}
          value={state}
          onChange={onChange}
          id={id}
          name={id}
          style={{ height }} // Apply height style
          ref={ref}
          {...rest} // Spread all textarea props
        />
      </Field>
    );
  }
);
