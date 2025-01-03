import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  variant?: 'default' | 'wine';
}

export const Progress = ({
  value,
  max = 5,
  label,
  showValue = false,
  className = '',
  variant = 'default'
}: ProgressProps) => {
  const percentage = (value / max) * 100;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'wine':
        return 'bg-rose-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getVariantStyles()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}; 