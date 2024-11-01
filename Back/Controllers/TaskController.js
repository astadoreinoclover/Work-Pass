const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova Task
exports.createTask = async (req, res) => {
    const { titulo, descricao, valorEntrega, habilidadeId, dataFinal } = req.body;

    if(!titulo || !descricao || !valorEntrega || !habilidadeId || !dataFinal) {
        res.status(500).json({ error: 'Preencha todos os campos'});
        return
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                titulo,
                descricao,
                valorEntrega,
                habilidadeId,
                dataFinal: dataFinal
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

exports.createTaskUser = async (req, res) => {
    const { task_id, user_id } = req.body;
    try {
        const newTask = await prisma.userTask.create({
            data: {
                user_id: user_id,
                task_id: task_id,
                status: 'EM_ANDAMENTO'
            },
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Task', details: error.message });
    }
};

exports.deleteAllTasksByUserId = async (req, res) => {
    const { user_id } = req.params; // O ID do usuário será passado como parâmetro da URL
    try {
        const deletedTasks = await prisma.userTask.deleteMany({
            where: {
                user_id: user_id, // Filtra as tarefas do usuário específico
            },
        });

        if (deletedTasks.count === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este usuário.' });
        }

        res.status(200).json({ message: 'Todas as tarefas do usuário foram excluídas com sucesso.', deletedCount: deletedTasks.count });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir as tarefas', details: error.message });
    }
};

exports.getTaskDetailsByStatusAndDepartment = async (req, res) => {
    const { status, departamento, id_empresa } = req.body;

    try {
        // Buscando usuários com base nas condições fornecidas
        const users = await prisma.user.findMany({
            where: {
                id_empresa: id_empresa,
                role: "USER",
                ...(departamento && departamento.toLowerCase() !== 'geral' ? { departamento } : {})
            },
            include: {
                tasks: { // Incluindo UserTasks para obter o status
                    where: {
                        status: status,
                    },
                    include: {
                        task: true // Incluir as informações da Task associada
                    }
                }
            }
        });

        // Aqui estamos coletando os IDs das Tasks, não das UserTasks
        const taskIds = users.flatMap(user => user.tasks.map(userTask => userTask.task.id));

        if (taskIds.length === 0) {
            return res.status(200).json([]);
        }

        // Buscando detalhes das tarefas usando os IDs coletados
        const tasksDetails = await prisma.task.findMany({
            where: {
                id: { in: taskIds }
            }
        });

        // Montando a resposta com os detalhes das tarefas e o nome do funcionário
        const tasksResponse = tasksDetails.map(task => {
            // Encontrar o usuário associado à tarefa
            const funcionario = users.find(user => user.tasks.some(userTask => userTask.task.id === task.id));
            return {
                funcionario: funcionario ? funcionario.name : 'Desconhecido', // Se não encontrar o funcionário, retorna 'Desconhecido'
                id_task: task.id,
                titulo: task.titulo,
                descricao: task.descricao,
                fechamento: task.dataFinal,
                pts: task.valorEntrega
            };
        });

        res.status(200).json(tasksResponse);
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
    }
};

