'use client'

import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, description, error, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={`
              ${sizeClasses[size]}
              text-rose-600
              bg-gray-100
              border-gray-300
              rounded
              focus:ring-rose-500
              focus:ring-2
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            ref={ref}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label 
                htmlFor={props.id} 
                className={`
                  font-medium 
                  ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}
                  ${props.disabled ? 'text-gray-400' : 'text-gray-700'}
                `}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={`
                ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'}
                ${props.disabled ? 'text-gray-300' : 'text-gray-500'}
              `}>
                {description}
              </p>
            )}
            {error && (
              <p className={`
                ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'}
                text-red-500
              `}>
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface CheckboxGroupProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const CheckboxGroup = ({ 
  children, 
  label, 
  className = '',
  orientation = 'vertical' 
}: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={`
        ${orientation === 'horizontal' ? 'flex space-x-4' : 'space-y-2'}
      `}>
        {children}
      </div>
    </div>
  );
}; 