import React, { createContext, useState, ReactNode } from 'react';

interface FuncionariosContextType {
  filterFunc: string;
  setFilterFunc: (filter: string) => void;
  resetFilters: () => void;
}

const defaultContextValueFunc: FuncionariosContextType = {
  filterFunc: 'Geral',
  setFilterFunc: () => {},
  resetFilters: () => {},
};

export const FuncionariosContext = createContext<FuncionariosContextType>(defaultContextValueFunc);

export const FuncionariosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterFunc, setFilterFunc] = useState<string>('Geral');

  const resetFilters = () => {
    setFilterFunc('Geral');
  };

  return (
    <FuncionariosContext.Provider value={{ filterFunc, setFilterFunc, resetFilters }}>
      {children}
    </FuncionariosContext.Provider>
  );
};
