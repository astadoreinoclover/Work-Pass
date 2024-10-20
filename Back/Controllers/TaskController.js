const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova Task
exports.createTask = async (req, res) => {
    const { titulo, descricao, valorEntrega, habilidadeId, tipoEntrega, dataFinal } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: {
                titulo,
                descricao,
                valorEntrega,
                habilidadeId,
                tipoEntrega,
                dataFinal: new Date(dataFinal),
            },
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Task', details: error.message });
    }
};

// Obter uma Task por ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
        });
        if (!task) return res.status(404).json({ error: 'Task não encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Task', details: error.message });
    }
};

// Atualizar uma Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, valorEntrega, habilidadeId, tipoEntrega, dataFinal } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                descricao,
                valorEntrega,
                habilidadeId,
                tipoEntrega,
                dataFinal: new Date(dataFinal),
            },
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Task', details: error.message });
    }
};

// Deletar uma Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Task', details: error.message });
    }
};
