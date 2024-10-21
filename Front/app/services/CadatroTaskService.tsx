type Funcionario = {
    id: number;
    name: string;
    department: string;
    funcao: string;
    id_empresa: number;
};
  
const funcionariosTotais: Funcionario[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', funcao: 'Analista',id_empresa: 1  },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', funcao: 'Gerente',id_empresa: 1  },
    { id: 3, name: 'Maria Oliveira', department: 'TI', funcao: 'Desenvolvedora',id_empresa: 1 },
    { id: 4, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', id_empresa: 1},
    { id: 5, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', id_empresa: 2},
    { id: 6, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', id_empresa: 1},
    { id: 7, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', id_empresa: 1},
    { id: 8, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', id_empresa: 1},
];
  
  
  export async function getFuncionarioTask(department: string, id_empresa: number): Promise<Funcionario[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const foundFuncionario = funcionariosTotais.filter(fun => 
                (department === 'Geral' || fun.department === department) &&
                fun.id_empresa === id_empresa
              );
      
            resolve(foundFuncionario);
          }, 500);
      });
}