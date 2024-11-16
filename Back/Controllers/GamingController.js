const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createGaming = async (req, res) => {
    const { user_id } = req.body;
    try {
        const newGaming = await prisma.gaming.create({
            data: {
                xp: 0,
                nivel: 1,
                user_id
            },
        });
        res.status(201).json(newGaming);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Gaming', details: error.message });
    }
};

exports.getGamingById = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: "user_id não fornecido" });
    }

    try {
        const gamings = await prisma.gaming.findMany({
            where: {
                user_id: {
                    equals: parseInt(user_id),
                },
            },
        });

        if (gamings.length === 0) {
            return res.status(404).json({ error: "Gaming não encontrado" });
        }

        return res.json(gamings);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar Gaming", details: error.message });
    }
};

exports.updateGaming = async (req, res) => {
    const { id } = req.params;
    const { pontuacao, nivel, tempoJogos } = req.body;
    try {
        const updatedGaming = await prisma.gaming.update({
            where: { id: parseInt(id) },
            data: {
                pontuacao,
                nivel,
                tempoJogos,
            },
        });
        res.json(updatedGaming);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Gaming', details: error.message });
    }
};

exports.deleteGaming = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.gaming.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Gaming', details: error.message });
    }
};
