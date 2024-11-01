import React, { createContext, useState, ReactNode } from 'react';

interface TaskContextType {
  filterTask: string;
  setFilterTask: (filter: string) => void;
  resetFilters: () => void;
}

const TaskContextValue: TaskContextType = {
  filterTask: 'EM_ANDAMENTO',
  setFilterTask: () => {},
  resetFilters: () => {},
};

export const TaskContext = createContext<TaskContextType>(TaskContextValue);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterTask, setFilterTask] = useState<string>('EM_ANDAMENTO');

  const resetFilters = () => {
    setFilterTask('EM_ANDAMENTO');
  };

  return (
    <TaskContext.Provider value={{ filterTask, setFilterTask, resetFilters }}>
      {children}
    </TaskContext.Provider>
  );
};
