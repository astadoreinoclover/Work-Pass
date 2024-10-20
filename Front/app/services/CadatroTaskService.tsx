type Funcionario = {
    id: number;
    name: string;
    department: string;
    funcao: string;
    empresa: string;
};
  
const funcionariosTotais: Funcionario[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', funcao: 'Analista',empresa: 'Senac'  },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', funcao: 'Gerente',empresa: 'Batata'  },
    { id: 3, name: 'Maria Oliveira', department: 'TI', funcao: 'Desenvolvedora',empresa: 'Senac' },
    { id: 4, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', empresa: 'Senac'},
    { id: 5, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', empresa: 'Senac'},
    { id: 6, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', empresa: 'Senac'},
    { id: 7, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', empresa: 'Senac'},
    { id: 8, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', empresa: 'Senac'},
];
  
  
  export async function getFuncionarioTask(department: string, empresa: string): Promise<Funcionario[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const foundFuncionario = funcionariosTotais.filter(fun => 
                (department === 'Geral' || fun.department === department) &&
                fun.empresa.toLowerCase() === empresa.toLowerCase()
              );              
      
            resolve(foundFuncionario);
          }, 500);
      });
}