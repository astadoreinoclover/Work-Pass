const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'seuSegredoAqui';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
            expiresIn: '12h',
        });

        const endereco = await prisma.endereco.findFirst({
            where: { id_user: parseInt(user.id) },
        });
        if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado' });

        return res.json({
            message: 'Login bem-sucedido',
            token: token,
            id: user.id,
            name: user.name,
            email: user.email,
            funcao: user.funcao,
            cpf: user.cpf,
            numero: user.numero,
            departamento: user.departamento,
            dataNascimento: user.dataNascimento,
            role: user.role,
            id_empresa: user.id_empresa,
            endereco: `${endereco.rua} ${endereco.numero}, ${endereco.bairro}`,
            cidade: endereco.cidade,
            estado: `${endereco.estado} - ${endereco.pais}`
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

module.exports = { login };
