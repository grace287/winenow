import React from 'react';

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = '' }: DialogProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const DialogHeader = ({ children, className = '' }: DialogProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const DialogTitle = ({ children, className = '' }: DialogProps) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

export const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <div role="button" tabIndex={0}>
      {children}
    </div>
  );
};
