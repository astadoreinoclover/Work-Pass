type Tasks = {
  id: number;
  name: string;
  department: string;
  points: number;
  funcionario: string;
  descricao: string;
  fechamento: string;
  status: string;
  id_empresa: number;
};
  
  // Dados simulados para cada período
  const TasksTotais: Tasks[] = [
    { id: 1, name: 'Campanha', department: 'Marketing', points: 75, funcionario: 'Ana', descricao: 'Campanha de mídias sociais', fechamento: '2024-10-01',status: 'Entregue', id_empresa: 1},
    { id: 2, name: 'Renda', department: 'Financeiro', points: 90, funcionario: 'Carlos', descricao: 'Fechamento mensal', fechamento: '2024-10-05', status: 'Em Desenvolvimento', id_empresa: 1},
    { id: 3, name: 'Atualização', department: 'TI', points: 65, funcionario: 'Maria', descricao: 'Atualização de sistemas', fechamento: '2024-10-10', status: 'Não Entregue', id_empresa: 1},
    { id: 4, name: 'Relatorio', department: 'Financeiro', points: 80, funcionario: 'João', descricao: 'Relatório de vendas trimestral', fechamento: '2024-10-15', status: 'Em Desenvolvimento', id_empresa: 2},
  ];
  export async function getTasks(department: string, status: string, empresa: number): Promise<Tasks[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtro por departamento
        const filteredTasksByDepartment = department === 'Geral'
          ? TasksTotais
          : TasksTotais.filter(task => task.department === department);

        // Filtro por status
        const filteredTasksByStatus = status
          ? filteredTasksByDepartment.filter(task => task.status === status)
          : filteredTasksByDepartment;

        // Filtro por empresa
        const filteredTasksByEmpresa = empresa
          ? filteredTasksByStatus.filter(task => task.id_empresa === empresa)
          : filteredTasksByStatus;
  
        console.log('Tarefas filtradas por empresa:', filteredTasksByEmpresa); // Debug para ver o que está sendo filtrado
        resolve(filteredTasksByEmpresa);
      }, 500);
    });
  }
  
  