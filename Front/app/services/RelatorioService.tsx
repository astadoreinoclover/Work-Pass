type Funcionarios = {
    id: number;
    department: string;
    entregue: number;
    naoEntregue: number;
    desenvolvimento: number;
  };
  
  // Dados simulados para cada período
  const funcionariosTotais: Funcionarios[] = [
    { id: 1, department: 'Marketing', entregue: 5, naoEntregue: 2, desenvolvimento: 1},
    { id: 2, department: 'Financeiro', entregue: 7, naoEntregue: 1, desenvolvimento: 1},
    { id: 3, department: 'TI', entregue: 9, naoEntregue: 0, desenvolvimento: 2},
    { id: 4, department: 'Vendas', entregue: 1, naoEntregue: 1, desenvolvimento: 1},
  ];
  
  // Função para simular a API de ranking com base no período
  export async function getRelatorio(department: string): Promise<Funcionarios[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtrar os empregados pelo departamento
        const filteredFuncionarios = department === 'Geral'
          ? funcionariosTotais
          : funcionariosTotais.filter(fun => fun.department === department);
  
        resolve(filteredFuncionarios);
      }, 500); // Simula um tempo de resposta de 500ms
    });
  }
  