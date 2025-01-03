import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}

export const Button = ({ children, className, variant = 'default', ...props }: ButtonProps) => {
  return (
    <button 
      className={`px-4 py-2 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 