import { AuthData } from '../contexts/Auth'

async function login(email: string, senha: string):Promise<AuthData> {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(email === 'renato@gmail.com' && senha === "123456789") {
                resolve({
                    token: 'test-token-fake',
                    email,
                    name: 'Renato',
                    numero: '(53) 991000000',
                    cpf: '000.000.000-00',
                    dataNascimento: '24/12/2001',
                    departament: 'Financeiro',
                    rule: 'Funcionario',
                    funcao: 'Contador',
                    empresa: 'Senac'
                })
            } else if(email === 'vinicius@gmail.com' && senha === "123456789") {
                resolve({
                    token: 'test-token-fake',
                    email,
                    name: 'Vinicius',
                    numero: '(53) 991000000',
                    cpf: '000.000.000-00',
                    dataNascimento: '24/12/2001',
                    departament: 'Geral',
                    rule: 'Admin',
                    funcao: 'Administrador',
                    empresa: 'Senac'
                })
            } else if(email === 'bruna@gmail.com' && senha === "123456789") {
                resolve({
                    token: 'test-token-fake',
                    email,
                    name: 'Bruna 25',
                    numero: '(53) 991000000',
                    cpf: '000.000.000-00',
                    dataNascimento: '24/12/2001',
                    departament: 'Financeiro',
                    rule: 'Gerente',
                    funcao: 'Gerente',
                    empresa: 'Batata'
                }) 
            } else {
                reject(new Error('Credenciais invalidas'))
            }
        }, 500);
    })
}

export const authServise = {login}