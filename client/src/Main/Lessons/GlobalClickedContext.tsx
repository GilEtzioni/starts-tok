import React, { createContext, useContext, useState } from "react";

// Create Context
const GlobalClickedContext = createContext<{
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

// Provider Component
export const GlobalClickedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <GlobalClickedContext.Provider value={{ isClicked, setIsClicked }}>
      {children}
    </GlobalClickedContext.Provider>
  );
};

// Hook to use the context
export const useGlobalClicked = () => {
  const context = useContext(GlobalClickedContext);
  if (!context) {
    throw new Error("useGlobalClicked must be used within a GlobalClickedProvider");
  }
  return context;
};
