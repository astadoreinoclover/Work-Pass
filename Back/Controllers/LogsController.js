const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createLog = async (req, res) => {
    const { id_user, acao } = req.body;
    try {
        const newLog = await prisma.log.create({
            data: {
                id_user,
                acao,
                data: new Date(),
            },
        });
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Log', details: error.message });
    }
};

exports.getLogsByUserId = async (req, res) => {
    const { id_user } = req.params;
    try {
        const logs = await prisma.log.findMany({
            where: { id_user: parseInt(id_user) },
        });
        if (!logs) return res.status(404).json({ error: 'Logs não encontrados' });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Logs', details: error.message });
    }
};

exports.updateLog = async (req, res) => {
    const { id } = req.params;
    const { acao, data } = req.body;
    try {
        const updatedLog = await prisma.log.update({
            where: { id: parseInt(id) },
            data: {
                acao,
                data: new Date(data),
            },
        });
        res.json(updatedLog);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Log', details: error.message });
    }
};

exports.deleteLog = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.log.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Log', details: error.message });
    }
};
