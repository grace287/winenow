import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'wine';
  className?: string;
}

export const Badge = ({ 
  children, 
  variant = 'default',
  className = '' 
}: BadgeProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-800';
      case 'outline':
        return 'border border-gray-200 text-gray-800';
      case 'wine':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-rose-500 text-white';
    }
  };

  return (
    <span className={`
      inline-flex items-center 
      rounded-full 
      px-2.5 py-0.5 
      text-xs font-medium 
      ${getVariantClasses()}
      ${className}
    `}>
      {children}
    </span>
  );
}; 