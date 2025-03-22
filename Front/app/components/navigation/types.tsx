export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Perfil: undefined;
    Tasks: undefined;
    Rankings: undefined;
    Relatorios: undefined;
    Funcionarios: undefined;
    TrocaDeSenha: undefined;
    EditarDados: undefined;
    RemoverFuncionario: undefined;
    AddFuncionario: undefined;
    Funcionario: { itemName: string, itemDepartament: string, itemId: number };
    AdicionarTask: undefined;
    EditeTask: {id_taskUser: number};
};