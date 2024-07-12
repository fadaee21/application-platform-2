import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const PrimaryButtons: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const buttonStyle = clsx(
    {
      "bg-gray-400 text-gray-500 cursor-not-allowed": disabled,
      "bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-900 hover:dark:bg-indigo-800 hover:text-slate-900 hover:dark:text-slate-50 text-gray-800 dark:text-slate-300":
        !disabled,
      "flex justify-center px-4 py-2 text-sm font-semibold leading-6 rounded-md shadow-md whitespace-nowrap":
        true,
      "w-full": fullWidth,
    },
    className
  );
//className="bg-red-400" define type to use for delete button
  return (
    <button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
