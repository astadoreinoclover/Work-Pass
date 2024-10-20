import React, { createContext, useState, ReactNode } from 'react';

interface RelatorioContextType {
  filter: string;
  setFilter: (filter: string) => void;
  filterForma: string;
  setFilterForma: (filter: string) => void;
  resetFilters: () => void;
}

const RelatorioContextValue: RelatorioContextType = {
  filter: 'Geral',
  filterForma: 'Pizza',
  setFilter: () => {},
  setFilterForma:()=> {},
  resetFilters: () => {},
};

export const RelatorioContext = createContext<RelatorioContextType>(RelatorioContextValue);

export const RelatorioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>('Geral');
  const [filterForma, setFilterForma] = useState<string>('Pizza');

  const resetFilters = () => {
    setFilter('Geral');
    setFilterForma('Pizza');
  };

  return (
    <RelatorioContext.Provider value={{ filter, setFilter, filterForma, setFilterForma, resetFilters }}>
      {children}
    </RelatorioContext.Provider>
  );
};