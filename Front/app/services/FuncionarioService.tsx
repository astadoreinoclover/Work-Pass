type Habilidade = {
    nome: string;
    nivel: number;
};

type Funcionario = {
    id: number;
    name: string;
    department: string;
    funcao: string;
    numero: string;
    dataNasc: string;
    email: string;
    xp: number;
    xpNescessario: number;
    nivel: number;
    habilidades?: Habilidade[];
};
  
const funcionariosTotais: Funcionario[] = [
    { id: 1, name: 'Ana Silva', department: 'Marketing', funcao: 'Analista', numero: '123456789', dataNasc: '1990-01-01', email: 'ana.silva@email.com', xp: 120, xpNescessario: 150, nivel:3, habilidades:[{nome: 'comunicação', nivel: 2}] },
    { id: 2, name: 'Carlos Souza', department: 'Financeiro', funcao: 'Gerente', numero: '987654321', dataNasc: '1985-05-15', email: 'carlos.souza@email.com', xp: 30, xpNescessario: 50, nivel:1, habilidades:[{nome: 'comunicação', nivel: 2}] },
    { id: 3, name: 'Maria Oliveira', department: 'TI', funcao: 'Desenvolvedora', numero: '564738291', dataNasc: '1992-03-23', email: 'maria.oliveira@email.com', xp: 211, xpNescessario: 250, nivel:5, habilidades:[{nome: 'comunicação', nivel: 1}] },
    { id: 4, name: 'João Ferreira', department: 'Vendas', funcao: 'Vendedor', numero: '473829165', dataNasc: '1988-11-11', email: 'joao.ferreira@email.com', xp: 100, xpNescessario: 150, nivel:3, habilidades:[{nome: 'comunicação', nivel: 1}]},
];
  
  
  export async function getFuncionario(department: string, name: string, id: number): Promise<Funcionario[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
          const foundFuncionario = funcionariosTotais.find(fun =>
            fun.department === department &&
            fun.name.toLowerCase() === name.toLowerCase() &&
            fun.id === id
          );
    
          resolve(foundFuncionario ? [foundFuncionario] : []);
        }, 500);
      });
  }