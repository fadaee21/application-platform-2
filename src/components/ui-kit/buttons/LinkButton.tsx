type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LinkButton: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  const buttonStyle = `
  ${
    disabled
      ? "text-gray-500 cursor-not-allowed"
      : "text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
  }
  inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm font-semibold focus:outline-none whitespace-nowrap
  ${className}
  `;

  return (
    <button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
