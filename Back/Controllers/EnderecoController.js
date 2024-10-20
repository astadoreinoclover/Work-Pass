const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo Endereço
exports.createEndereco = async (req, res) => {
    const { id_user, bairro, numero, rua, complemento, cidade, estado, pais } = req.body;
    try {
        const newEndereco = await prisma.endereco.create({
            data: {
                id_user,
                bairro,
                numero,
                rua,
                complemento,
                cidade,
                estado,
                pais,
            },
        });
        res.status(201).json(newEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Endereço', details: error.message });
    }
};

// Obter Endereço por ID do usuário
exports.getEnderecoByUserId = async (req, res) => {
    const { id_user } = req.params;
    try {
        const endereco = await prisma.endereco.findMany({
            where: { id_user: parseInt(id_user) },
        });
        if (!endereco) return res.status(404).json({ error: 'Endereço não encontrado' });
        res.json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Endereço', details: error.message });
    }
};

// Atualizar Endereço
exports.updateEndereco = async (req, res) => {
    const { id } = req.params;
    const { bairro, numero, rua, complemento, cidade, estado, pais } = req.body;
    try {
        const updatedEndereco = await prisma.endereco.update({
            where: { id: parseInt(id) },
            data: {
                bairro,
                numero,
                rua,
                complemento,
                cidade,
                estado,
                pais,
            },
        });
        res.json(updatedEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Endereço', details: error.message });
    }
};

// Deletar Endereço
exports.deleteEndereco = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.endereco.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Endereço', details: error.message });
    }
};
