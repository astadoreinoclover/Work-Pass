const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { parse, isBefore } = require('date-fns');

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
    const { task_id, user_id, delivery_type, meta_type, meta_value } = req.body;
    try {
        const newTask = await prisma.userTask.create({
            data: {
                user_id: user_id,
                task_id: task_id,
                delivery_type: delivery_type,
                meta_type: meta_type ? meta_type : null,
                meta_value: meta_value ? meta_value : null,
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
                    pts: userTask.task.valorEntrega,
                    delivery_type: userTask.delivery_type,
                    meta_type: userTask.meta_type,
                    meta_value: userTask.meta_value,
                    status: userTask.status,
                    entrega: userTask.entrega,
                    finalizado: userTask.finalizado,
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
                        updatedAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                        OR: [
                            { status: 'CONCLUIDA' },
                            { status: 'NAO_ENTREGUE' }
                        ],
                    },
                    select: {
                        status: true,
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
            let totalPontos = 0;
        
            user.tasks.forEach(userTask => {
                const pontos = userTask.task.valorEntrega;
                if (userTask.status === 'CONCLUIDA') {
                    totalPontos += pontos;
                } else if (userTask.status === 'NAO_ENTREGUE') {
                    totalPontos -= pontos;
                }
            });
        
            // Garantir que nunca retorne pontos negativos
            if (totalPontos < 0) {
                totalPontos = 0;
            }
        
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

exports.getTaskforEdite = async (req, res) => {
    const { id_empresa, id } = req.body;

    try {
        const task = await prisma.userTask.findUnique({
            where: { id: parseInt(id) },
            include: {
                task: true,
                user: {
                    select: {
                        id_empresa: true,
                        id: true
                    },
                }
            }
        });
        if (!task) return res.status(404).json({ error: 'Task não encontrada' });
        res.json({
            id: task.id,
            taskName: task.task.titulo,
            taskDetails: task.task.descricao,
            valorEntrega: task.task.valorEntrega,
            userEmpresa: task.user.id_empresa,
            idUser: task.user.id,
            habilidadeId: task.task.habilidadeId,
            dataFinal: task.task.dataFinal,
            deliveryType: task.delivery_type,
            metaType: task.meta_type,
            metaValue: task.meta_value,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Task', details: error.message });
    }
}

exports.entregaTask = async (req, res) => {
    const { id } = req.params;
    const entrega = req.file ? `/uploads/tasks/${req.file.filename}` : null;

    console.log("ID recebido:", id);
    console.log("Arquivo recebido:", req.file);

    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const taskExists = await prisma.userTask.findUnique({ where: { id: Number(id) } });
        if (!taskExists) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        const updatedTask = await prisma.userTask.update({
            where: { id: Number(id) },
            data: { entrega },
        });

        const updatedTask2 = await prisma.userTask.update({
            where: { id: Number(id) },
            data: {
                status: 'CONCLUIDA'
            }
        });

        res.json(updatedTask2);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
};

exports.getTaskDetailsByStatusAndDepartmentAndId = async (req, res) => {
    const { status, departamento, id_empresa, id } = req.body;

    try {
        const users = await prisma.user.findMany({
            where: {
                id_empresa: id_empresa,
                role: "USER",
                ...(departamento && departamento.toLowerCase() !== 'geral' ? { departamento } : {}),
                id: id
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
                    pts: userTask.task.valorEntrega,
                    delivery_type: userTask.delivery_type,
                    meta_type: userTask.meta_type,
                    meta_value: userTask.meta_value,
                    status: userTask.status,
                    entrega: userTask.entrega,
                }))
        );

        res.status(200).json(tasksResponse);
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
    }
};

exports.entregaTaskTypeValue = async (req, res) => {
    const { id, value } = req.body;

    try {
        const userTask = await prisma.userTask.update({
             where: {
                id: id,
            },
            data: { entrega: value, status: 'CONCLUIDA' }
        });

        res.status(200).json(userTask);
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao entregar tarefas', details: error.message });
    }
};

exports.entregaTaskTypeMetaValue = async (req, res) => {
    const { id, value } = req.body;

    try {
        const userTask = await prisma.userTask.findUnique({
            where: { id },
            select: { entrega: true,  meta_value: true }
        });

        const entregaAtual = userTask?.entrega
        ? parseFloat(userTask.entrega.replace(',', '.'))
        : 0;

        const valorNovo = parseFloat(value.replace(',', '.'));

        if (isNaN(valorNovo)) {
            return res.status(400).json({ error: 'Valor de entrega inválido.' });
        }

        const entregaAtualizada = entregaAtual + valorNovo;

        const updatedTask = await prisma.userTask.update({
            where: { id },
            data: { entrega: entregaAtualizada.toString() }
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao entregar tarefas', details: error.message });
    }
};

exports.atualizarStatusPorEntregaMeta = async (req, res) => {
  const { id } = req.body;

  try {
    const userTask = await prisma.userTask.findUnique({
      where: { id },
      select: { entrega: true, meta_value: true, status: true }
    });

    if (!userTask) {
      return res.status(404).json({ error: 'Task não encontrada.' });
    }

    const entregaNum = userTask.entrega
      ? parseFloat(userTask.entrega.replace(',', '.'))
      : 0;

    const parseCurrencyToNumber = (value) => {
      return Number(value.replace(/[R$\s]/g, '').replace(',', '.'));
    };

    const metaNum = parseCurrencyToNumber(userTask.meta_value);

    if (isNaN(entregaNum) || isNaN(metaNum)) {
      return res.status(400).json({ error: 'Valores inválidos para entrega ou meta_value.' });
    }

    let novoStatus = userTask.status;

    if (entregaNum >= metaNum) {
      novoStatus = 'CONCLUIDA';
    }

    const updatedTask = await prisma.userTask.update({
      where: { id },
      data: { status: novoStatus }
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erro ocorrido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status da task', details: error.message });
  }
};

exports.validationTask = async (req, res) => {
    const { id, button } = req.body;
    console.log("ID recebido:", id);
    console.log("Botão recebido:", button);
    try {
        if (!id || !button) {
            return res.status(400).json({ error: 'ID e botão são obrigatórios' });
        }

        if (button === 'ACEITO') {
            const task = await prisma.userTask.update({
                where: { id: parseInt(id) },
                data: { finalizado: 'TRUE' },
                include: { task: true } // garantir acesso aos pontos
            });

            const pontos = Number(task.task?.valorEntrega || 0);
            const userId = task.user_id;

            if (isNaN(pontos)) {
                return res.status(400).json({ error: 'Pontos da tarefa são inválidos ou ausentes.' });
            }

            const gaming = await prisma.gaming.findUnique({
                where: { user_id: userId }
            });

            if (!gaming) {
                return res.status(404).json({ error: 'Registro de gamificação não encontrado.' });
            }

            let xpAtual = Number(gaming.xp || 0);
            let novoXp = xpAtual + pontos;
            let nivel = gaming.nivel;
            let xpNecessario = gaming.xpNecessarioParaSubirNivel;

            // Logs úteis
            console.log({ xpAtual, pontos, novoXp, nivel, xpNecessario });

            // Sobe de nível enquanto possível
            while (novoXp >= xpNecessario) {
                novoXp -= xpNecessario;
                nivel += 1;
                xpNecessario = Math.floor(xpNecessario * 1.5); // ajuste conforme sua regra
            }

            // Garante que xp está definido e é um inteiro
            novoXp = Math.floor(novoXp);

            const updatedGaming = await prisma.gaming.update({
                where: { user_id: userId },
                data: {
                    xp: novoXp,
                    nivel: nivel,
                    xpNecessarioParaSubirNivel: xpNecessario
                }
            });

            const habilidadeId = task.task.habilidadeId;

            if (habilidadeId) {
                // Tenta encontrar a habilidade do usuário
                let habilidadeUser = await prisma.habilidadeUser.findFirst({
                    where: {
                        id_habilidade: habilidadeId,
                        user_id: userId
                    }
                });

                if (habilidadeUser) {
                    // Atualiza se já existe
                    let habXp = habilidadeUser.xp + pontos;
                    let habNivel = habilidadeUser.nivel;
                    let habXpNecessario = habilidadeUser.xpNecessarioParaSubirNivel;

                    while (habXp >= habXpNecessario) {
                        habXp -= habXpNecessario;
                        habNivel += 1;
                        habXpNecessario = Math.floor(habXpNecessario * 1.5);
                    }

                    habXp = Math.floor(habXp);

                    habilidadeUser = await prisma.habilidadeUser.update({
                        where: { id: habilidadeUser.id },
                        data: {
                            xp: habXp,
                            nivel: habNivel,
                            xpNecessarioParaSubirNivel: habXpNecessario
                        }
                    });
                } else {
                    // Cria se não existir
                    let habXp = pontos;
                    let habNivel = 1;
                    let habXpNecessario = 50;

                    while (habXp >= habXpNecessario) {
                        habXp -= habXpNecessario;
                        habNivel += 1;
                        habXpNecessario = Math.floor(habXpNecessario * 1.5);
                    }

                    habXp = Math.floor(habXp);

                    habilidadeUser = await prisma.habilidadeUser.create({
                        data: {
                            id_habilidade: habilidadeId,
                            user_id: userId,
                            xp: habXp,
                            nivel: habNivel,
                            xpNecessarioParaSubirNivel: habXpNecessario
                        }
                    });
                }
            }

            return res.status(200).json({ task, updatedGaming });
        } else if (button === 'REJEITADO') {
            const task = await prisma.userTask.update({
                where: { id: parseInt(id) },
                data: {
                    status: 'EM_ANDAMENTO',
                }
            });
            res.status(200).json(task);
        } else {
            return res.status(400).json({ error: 'Botão inválido' });
        }
    } catch (error) {
        console.error('Erro ocorrido:', error);
        res.status(500).json({ error: 'Erro ao validar tarefa', details: error.message });
    }
};
