import React from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className = '', label, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          className={`
            w-full h-2 
            bg-gray-200 
            rounded-lg 
            appearance-none 
            cursor-pointer 
            accent-rose-600
            ${className}
          `}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider'; 