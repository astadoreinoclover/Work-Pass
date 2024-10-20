const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova Carreira
exports.createCarreira = async (req, res) => {
    const { id_user, nome, descricao } = req.body;
    try {
        const newCarreira = await prisma.carreira.create({
            data: {
                id_user,
                nome,
                descricao,
            },
        });
        res.status(201).json(newCarreira);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Carreira', details: error.message });
    }
};

// Obter uma Carreira por ID
exports.getCarreiraById = async (req, res) => {
    const { id } = req.params;
    try {
        const carreira = await prisma.carreira.findUnique({
            where: { id: parseInt(id) },
        });
        if (!carreira) return res.status(404).json({ error: 'Carreira não encontrada' });
        res.json(carreira);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Carreira', details: error.message });
    }
};

// Atualizar uma Carreira
exports.updateCarreira = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
        const updatedCarreira = await prisma.carreira.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                descricao,
            },
        });
        res.json(updatedCarreira);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Carreira', details: error.message });
    }
};

// Deletar uma Carreira
exports.deleteCarreira = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.carreira.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Carreira', details: error.message });
    }
};
