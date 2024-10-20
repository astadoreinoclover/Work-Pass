type Employee = {
    id: number;
    name: string;
    department: string;
    points: number;
  };
  
  // Dados simulados para cada período
  const weeklyEmployees: Employee[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', points: 50 },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', points: 70 },
    { id: 3, name: 'Maria Oliveira', department: 'TI', points: 100 },
    { id: 4, name: 'João Ferreira', department: 'Vendas', points: 80 },
  ];
  
  const monthlyEmployees: Employee[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', points: 150 },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', points: 200 },
    { id: 3, name: 'Maria Oliveira', department: 'TI', points: 300 },
    { id: 4, name: 'João Ferreira', department: 'Vendas', points: 250 },
  ];
  
  const yearlyEmployees: Employee[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', points: 500 },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', points: 700 },
    { id: 3, name: 'Maria Oliveira', department: 'TI', points: 1000 },
    { id: 4, name: 'João Ferreira', department: 'Vendas', points: 800 },
  ];
  
  // Função para simular a API de ranking com base no período
  export async function getRanking(department: string, period: string): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let employees: Employee[] = [];
  
        // Retornar os dados com base no período
        switch (period) {
          case 'Semana':
            employees = weeklyEmployees;
            break;
          case 'Mês':
            employees = monthlyEmployees;
            break;
          case 'Ano':
            employees = yearlyEmployees;
            break;
          default:
            employees = monthlyEmployees; // Default para o mês, se o período não for fornecido
        }
  
        // Filtrar os empregados pelo departamento
        const filteredEmployees = department === 'Geral'
          ? employees
          : employees.filter(emp => emp.department === department);
  
        // Simular o resultado ordenado por pontos
        const sortedEmployees = filteredEmployees.sort((a, b) => b.points - a.points);
  
        resolve(sortedEmployees);
      }, 500); // Simula um tempo de resposta de 500ms
    });
  }

export async function getDepartments(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Marketing', 'Financeiro', 'TI', 'Vendas']);
      }, 500); // Simula um tempo de resposta de 500ms
    });
}