'use client'

import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export const Avatar = ({ src, alt, fallback, className = '' }: AvatarProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || 'avatar'}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          {fallback || alt?.charAt(0) || '?'}
        </div>
      )}
    </div>
  );
};

export const AvatarImage = ({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt?: string; 
  className?: string;
}) => (
  <img
    src={src}
    alt={alt || 'avatar'}
    className={`w-10 h-10 rounded-full object-cover ${className}`}
  />
);

export const AvatarFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
      {children}
    </div>
  );
}; 