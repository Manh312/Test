import type { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({ onClick, disabled, isLoading, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 text-white rounded hover:opacity-80 disabled:opacity-50 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-6 w-6">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;