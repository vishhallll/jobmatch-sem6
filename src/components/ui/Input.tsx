import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, fullWidth = false, icon: Icon, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${fullWidth ? 'w-full' : ''}
              ${Icon ? 'pl-10' : 'px-3'} py-2
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';