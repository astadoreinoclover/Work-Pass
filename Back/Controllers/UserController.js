const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { name, email, password, cpf, numero, departamento, role, dataNascimento, funcao, id_empresa } = req.body;

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    // Verifica se o e-mail já está cadastrado
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Validação da senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 caracteres.'
        });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                funcao,
                cpf,
                numero,
                departamento,
                dataNascimento,
                role,
                id_empresa,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
};


// Obter um usuário por ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { empresa: true, enderecos: true, logs: true, gaming: true, tasks: true, carreira: true, habilidades: true },
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Usuário', details: error.message });
    }
};

// obter usuario
exports.getUsersByRoleAndDepartment = async (req, res) => {
    const { role, departamento, id_empresa } = req.body; // Espera-se que role, departamento e id_empresa sejam passados no corpo da requisição

    try {
        const whereClause = {
            ...(role && { role }), // Filtra por role se fornecido
            ...(departamento && departamento.toLowerCase() !== 'geral' && { departamento }), // Filtra por departamento se fornecido e não for 'geral'
            ...(id_empresa && { id_empresa }), // Filtra por id_empresa se fornecido
        };

        const users = await prisma.user.findMany({
            where: whereClause,
            include: { empresa: true, enderecos: true },
        });

        if (!users.length) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado com os critérios especificados.' });
        }

        res.status(200).json(users); // Retorna os usuários encontrados com status 200
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
};


// Atualizar um usuário
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const {  email, numero, departamento, role } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                email,
                numero,
                departamento,
                role,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Usuário', details: error.message });
    }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

  try {
    await prisma.endereco.deleteMany({
      where: { id_user: Number(id) },
    });

    await prisma.userTask.deleteMany({
        where: { user_id: Number(id) },
    });

    await prisma.gaming.deleteMany({
        where: { user_id: Number(id) },
    });

    const funcionarioRemovido = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Funcionário removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover funcionário:', error);

    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Erro ao remover funcionário: Existem tarefas associadas a este funcionário.',
      });
    }

    return res.status(500).json({
      error: 'Erro interno do servidor. Tente novamente mais tarde.',
      details: error.message,
    });
  }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};

//Buscar usuarios na tela de exclusão
exports.getfuncionariosExclusao = async (req, res) => {
    const { departamento, id_empresa, userId, role } = req.query;

    console.log('Parâmetros recebidos:', { departamento, id_empresa, userId, role });

    try {
        const roleCondition = role === "MANAGER" ? ['ADMIN', 'USER'] : ['USER'];

        const departCondition = departamento === "Geral" ? undefined : [departamento];

        const funcionarios = await prisma.user.findMany({
            where: {
                ...(departCondition ? { departamento: { in: departCondition } } : {}),
                id_empresa: parseInt(id_empresa),
                role: {
                    in: roleCondition
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        const funcionariosFiltrados = funcionarios.filter(funcionario => funcionario.id !== parseInt(userId, 10));

        if (funcionariosFiltrados.length === 0) {
            return res.status(404).json({ message: 'Nenhum funcionário encontrado' });
        }

        return res.status(200).json(funcionariosFiltrados);
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        return res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
};

// Troca de senha
exports.updateSenha = async (req, res) => {
    const { id } = req.params;
    const {  senha, novaSenha } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(novaSenha)) {
        return res.status(400).json({
            error: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial e ter no mínimo 8 caracteres.'
        });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                password: novaSenha
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Usuário', details: error.message });
    }
};

