export type RouteParams = {
    itemName: string;
    itemDepartament: string;
    itemId: number;
};

export type Habilidade = {
    nome: string;
    nivel: number;
};

export type Gaming = {
    xp: number;
    xpNecessarioParaSubirNivel: number;
    nivel: number
}

export type Funcionario = {
    habilidades?: Habilidade[];
    id: number;
    name: string;
    departamento: string;
    funcao: string;
    numero: string;
    dataNascimento: string;
    email: string;
    gaming?:Gaming[]
    foto: string;
};

