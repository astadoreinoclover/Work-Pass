import React, { createContext, useState, ReactNode } from 'react';

interface RankingContextType {
  filter: string;
  setFilter: (filter: string) => void;
  period: string;
  setPeriod: (period: string) => void;
  resetFilters: () => void;
}

const defaultContextValue: RankingContextType = {
  filter: 'Geral',
  setFilter: () => {},
  period: 'Mês',
  setPeriod: () => {},
  resetFilters: () => {},
};

export const RankingContext = createContext<RankingContextType>(defaultContextValue);

export const RankingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>('Geral');
  const [period, setPeriod] = useState<string>('Mês');

  const resetFilters = () => {
    setFilter('Geral');
    setPeriod('Mês');
  };

  return (
    <RankingContext.Provider value={{ filter, setFilter, period, setPeriod, resetFilters }}>
      {children}
    </RankingContext.Provider>
  );
};
