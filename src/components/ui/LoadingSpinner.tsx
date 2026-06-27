import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ message = 'Loading...', fullScreen = false }: LoadingSpinnerProps) {
  const containerClasses = fullScreen 
    ? "min-h-screen flex flex-col items-center justify-center bg-background"
    : "flex flex-col items-center justify-center p-8 w-full h-full";

  return (
    <div className={containerClasses}>
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      {message && (
        <p className="mt-4 text-sm font-mono text-on-surface-variant uppercase tracking-widest animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
