const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEmpresa = async (req, res) => {
    const { nome, cnpj} = req.body;
    try {
        const newEmpresa = await prisma.empresa.create({
            data: {
                nome,
                cnpj,
                dataContratacao: new Date(),
                tempoDeContrato: 30,
                statusDoPlano: 'ATIVO',
            },
        });
        res.status(201).json(newEmpresa);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Empresa', details: error.message });
    }
};

exports.getEmpresaById = async (req, res) => {
    const { id } = req.params;
    try {
        const empresa = await prisma.empresa.findUnique({
            where: { id: parseInt(id) },
        });
        if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Empresa', details: error.message });
    }
};

exports.updateEmpresa = async (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, dataContratacao, tempoDeContrato, statusDoPlano } = req.body;
    try {
        const updatedEmpresa = await prisma.empresa.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                cnpj,
                dataContratacao: new Date(dataContratacao),
                tempoDeContrato,
                statusDoPlano,
            },
        });
        res.json(updatedEmpresa);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Empresa', details: error.message });
    }
};

exports.deleteEmpresa = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.empresa.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Empresa', details: error.message });
    }
};

exports.getDepartamentosByEmpresa = async (req, res) => {
    const { id_empresa } = req.params;
    try {
      const departamentos = await prisma.user.findMany({
        where: {
          id_empresa: Number(id_empresa),
        },
        select: {
          departamento: true,
        },
      });

      const departamentosUnicos = [...new Set(departamentos.map(dep => dep.departamento))];
      return res.json(departamentosUnicos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar departamentos' });
    }
  };