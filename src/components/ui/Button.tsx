import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
  secondary: 'bg-white text-blue-600 hover:bg-gray-50 shadow-sm',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  {
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    onClick,
    ...props
  },
  ref
) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
  const disabledStyles = 'disabled:opacity-50 disabled:pointer-events-none';
  
  return (
    <button
      ref={ref}
      className={`
        ${baseStyles}
        ${focusStyles}
        ${disabledStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} aria-hidden="true" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className={`h-4 w-4 ${children ? 'ml-2' : ''}`} aria-hidden="true" />
          )}
        </>
      )}
    </button>
  );
});