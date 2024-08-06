import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const OutlineButton: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const buttonStyle = clsx(
    {
      "border border-gray-400 text-gray-400 cursor-not-allowed": disabled,
      "border border-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 hover:border-indigo-500 dark:border-indigo-500 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:text-indigo-500 dark:text-indigo-500":
        !disabled,
      "flex items-center justify-center px-4 py-2 text-sm font-semibold leading-6 rounded-md shadow-md whitespace-nowrap":
        true,
      "w-full": fullWidth,
    },
    className
  );

  return (
    <button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default OutlineButton;
