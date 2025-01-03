'use client'

import React, { createContext, useContext, useState } from 'react';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, value, onValueChange, children, className = '' }: TabsProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  
  return (
    <TabsContext.Provider value={{
      value: value || selectedValue,
      onValueChange: onValueChange || setSelectedValue
    }}>
      <div className={`space-y-4 ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      className={`
        px-3 py-1.5 
        text-sm font-medium 
        rounded-md 
        transition-all
        ${isActive 
          ? 'bg-white text-rose-600 shadow-sm' 
          : 'text-gray-600 hover:text-gray-800'
        }
        ${className}
      `}
      onClick={() => context?.onValueChange(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = useContext(TabsContext);
  
  if (context?.value !== value) {
    return null;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}
