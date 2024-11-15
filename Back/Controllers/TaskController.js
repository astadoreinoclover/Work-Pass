const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { parse, isBefore } = require('date-fns');

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
    const { user_id } = req.params;
    try {
        const deletedTasks = await prisma.userTask.deleteMany({
            where: {
                user_id: user_id,
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
        const users = await prisma.user.findMany({
            where: {
                id_empresa: id_empresa,
                role: "USER",
                ...(departamento && departamento.toLowerCase() !== 'geral' ? { departamento } : {})
            },
            include: {
                tasks: {
                    include: {
                        task: true
                    }
                }
            }
        });

        for (const user of users) {
            for (const userTask of user.tasks) {
                const fechamentoDate = parse(userTask.task.dataFinal, 'dd/MM/yyyy', new Date());

                if (isBefore(fechamentoDate, new Date()) && userTask.status === 'EM_ANDAMENTO') {
                    await prisma.userTask.update({
                        where: { id: userTask.id },
                        data: { status: 'NAO_ENTREGUE' }
                    });
                    userTask.status = 'NAO_ENTREGUE';
                }
            }
        }

        const tasksResponse = users.flatMap(user => 
            user.tasks
                .filter(userTask => userTask.status === status)
                .map(userTask => ({
                    funcionario: user.name,
                    id_task: userTask.id,
                    titulo: userTask.task.titulo,
                    descricao: userTask.task.descricao,
                    fechamento: userTask.task.dataFinal,
                    pts: userTask.task.valorEntrega
                }))
        );

        res.status(200).json(tasksResponse);
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
    }
};

exports.deleteUserTaskById = async (req, res) => {
    const { id } = req.params;

    try {
      const userTask = await prisma.userTask.findUnique({
        where: { id: parseInt(id) },
      });

      if (!userTask) {
        return res.status(404).json({ message: 'UserTask não encontrada' });
      }

      await prisma.userTask.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: 'UserTask excluída com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao excluir a UserTask' });
    }
};

exports.getRanking = async (req, res) => {
    const { id_empresa, departamento, periodo } = req.body;
    const currentDate = new Date();
    let startDate, endDate;

    if (periodo === 'Semana') {
      const dayOfWeek = currentDate.getDay();
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (periodo === 'Mês') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (periodo === 'Ano') {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(currentDate.getFullYear(), 11, 31);
      endDate.setHours(23, 59, 59, 999);
    }

    try {
      const usersPoints = await prisma.user.findMany({
        where: {
          id_empresa: parseInt(id_empresa),
          departamento: departamento === 'Geral' ? undefined : departamento, 
          role: 'USER' 
        },
        select: {
          id: true,
          name: true,
          departamento: true,
          tasks: {
            where: {
              status: 'CONCLUIDA',
              updatedAt: {
                gte: startDate,
                lte: endDate,
              },
            },
            select: {
              task: {
                select: {
                  valorEntrega: true,
                },
              },
            },
          },
        },
      });

      const result = usersPoints.map(user => {
        const totalPontos = user.tasks.reduce((sum, userTask) => sum + userTask.task.valorEntrega, 0);
        return {
          id: user.id,
          name: user.name,
          departament: user.departamento,
          points: totalPontos,
        };
      });

      return res.json(result);
    } catch (error) {
      console.error("Erro ao buscar pontos dos usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
};