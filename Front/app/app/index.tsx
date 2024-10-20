import React from 'react';
import { Router } from './routes/Router';
import { AuthProvider } from '@/contexts/Auth';
import { RankingProvider } from '@/contexts/RankingContext';
import { FuncionariosProvider } from '@/contexts/FuncionariosContext';
import { RelatorioProvider } from '@/contexts/RelatorioContext';
import { TaskProvider } from '@/contexts/TaskContaxt';

export default function App() {
  return (
    <AuthProvider>
      <RankingProvider>
        <FuncionariosProvider>
          <RelatorioProvider>
            <TaskProvider>
              <Router />
            </TaskProvider>
          </RelatorioProvider>
        </FuncionariosProvider>
      </RankingProvider>
    </AuthProvider>
  );
}
