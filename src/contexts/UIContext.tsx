import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isUILocked: boolean;
  setUILocked: (locked: boolean) => void;
}

const UIContext = createContext<UIContextType>({ isUILocked: false, setUILocked: () => {} });

export function UIProvider({ children }: { children: ReactNode }) {
  const [isUILocked, setUILocked] = useState(false);
  return (
    <UIContext.Provider value={{ isUILocked, setUILocked }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
