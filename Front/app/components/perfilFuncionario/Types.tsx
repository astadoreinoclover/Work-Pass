export type RouteParams = {
    itemName: string;
    itemDepartament: string;
    itemId: number;
};

export type Habilidade = {
    nome: string;
    nivel: number;
};

export type Funcionario = {
    habilidades?: Habilidade[];
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
};