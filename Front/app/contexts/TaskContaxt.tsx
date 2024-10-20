import React, { createContext, useState, ReactNode } from 'react';

interface TaskContextType {
  filterTask: string;
  setFilterTask: (filter: string) => void;
  resetFilters: () => void;
}

const TaskContextValue: TaskContextType = {
  filterTask: 'Em Desenvolvimento',
  setFilterTask: () => {},
  resetFilters: () => {},
};

export const TaskContext = createContext<TaskContextType>(TaskContextValue);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterTask, setFilterTask] = useState<string>('Em Desenvolvimento');

  const resetFilters = () => {
    setFilterTask('Em Desenvolvimento');
  };

  return (
    <TaskContext.Provider value={{ filterTask, setFilterTask, resetFilters }}>
      {children}
    </TaskContext.Provider>
  );
};
