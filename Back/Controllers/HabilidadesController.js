const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova Habilidade
exports.createHabilidade = async (req, res) => {
    const { id_user, nome, nivel } = req.body;
    try {
        const newHabilidade = await prisma.habilidade.create({
            data: {
                id_user,
                nome,
                nivel,
            },
        });
        res.status(201).json(newHabilidade);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Habilidade', details: error.message });
    }
};

// Obter Habilidade por ID
exports.getHabilidadeById = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidade = await prisma.habilidade.findUnique({
            where: { id: parseInt(id) },
        });
        if (!habilidade) return res.status(404).json({ error: 'Habilidade não encontrada' });
        res.json(habilidade);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Habilidade', details: error.message });
    }
};

// Atualizar uma Habilidade
exports.updateHabilidade = async (req, res) => {
    const { id } = req.params;
    const { nome, nivel } = req.body;
    try {
        const updatedHabilidade = await prisma.habilidade.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                nivel,
            },
        });
        res.json(updatedHabilidade);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Habilidade', details: error.message });
    }
};

// Deletar uma Habilidade
exports.deleteHabilidade = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.habilidade.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Habilidade', details: error.message });
    }
};
