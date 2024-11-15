const express = require('express');
const router = express.Router();
const empresaController = require('../Controllers/EmpresaController.js');
const taskController = require('../Controllers/TaskController.js');
const carreiraController = require('../Controllers/CarreiraController.js');
const habilidadeController = require('../Controllers/HabilidadesController.js');
const gamingController = require('../Controllers/GamingController.js');
const logController = require('../Controllers/LogsController.js');
const loginController = require('../Controllers/LoginController.js');
const userController = require('../Controllers/UserController.js');
const authMiddleware = require('../Middlewares/AuthMiddleware.js');
const emderecoController = require('../Controllers/EnderecoController.js')

router.post('/ranking', taskController.getRanking)

// Rotas de login e registro
router.post('/login', loginController.login);
router.post('/register', userController.createUser);
router.post('/createEndereco', emderecoController.createEndereco)
router.post('/users', userController.getUsersByRoleAndDepartment)

router.get('/funcionariosExclussao', authMiddleware, userController.getfuncionariosExclusao)

router.post('/endereco', emderecoController.createEndereco);

router.delete('/funcionariosDelete/:id', userController.deleteUser)

router.put('/trocaSenha/:id', userController.updateSenha)

router.get('/user/:id', userController.getUserById)

router.get('/countStatus', userController.getTaskCountByEmployee)

router.get('/taskDepartamentStatus', userController.getTaskCountByDepartament)

router.delete('/deleteTask/:id', taskController.deleteUserTaskById)

// Exemplo de rota protegida (requer token JWT)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acesso permitido', user: req.user });
});

// Rotas para Empresa
// router.post('/empresas', empresaController.createEmpresa);
// router.get('/empresas/:id', empresaController.getEmpresaById);
// router.put('/empresas/:id', empresaController.updateEmpresa);
// router.delete('/empresas/:id', empresaController.deleteEmpresa);
router.get('/empresa/:id', empresaController.getEmpresaById);
router.post('/empresa', empresaController.createEmpresa);
router.put('/empresa/:id', authMiddleware, empresaController.updateEmpresa);
router.delete('/empresa/:id', authMiddleware, empresaController.deleteEmpresa);
router.get('/empresa/:id_empresa/departamentos', empresaController.getDepartamentosByEmpresa)

// Rotas para Task
// router.post('/tasks', taskController.createTask);
// router.get('/tasks/:id', taskController.getTaskById);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);
router.get('/task/:id', authMiddleware, taskController.getTaskById);
router.post('/task', taskController.createTask);
router.put('/task/:id', authMiddleware, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);
router.post('/taskUser', taskController.createTaskUser);
router.delete('/taskUser/:id', authMiddleware, taskController.deleteAllTasksByUserId);
router.post('/tasks', taskController.getTaskDetailsByStatusAndDepartment)

// Rotas para Carreira
router.post('/carreiras', carreiraController.createCarreira);
router.get('/carreiras/:id', carreiraController.getCarreiraById);
router.put('/carreiras/:id', carreiraController.updateCarreira);
router.delete('/carreiras/:id', carreiraController.deleteCarreira);

// Rotas para Habilidades
router.post('/habilidades', habilidadeController.createHabilidade);
router.get('/habilidades/:id', habilidadeController.getHabilidadeById);
router.put('/habilidades/:id', habilidadeController.updateHabilidade);
router.delete('/habilidades/:id', habilidadeController.deleteHabilidade);
router.get('/habilidades', habilidadeController.getHabilidade);

// Rotas para Gaming
router.post('/gaming', gamingController.createGaming);
router.get('/gaming/:user_id', gamingController.getGamingById);
router.put('/gaming/:id', gamingController.updateGaming);
router.delete('/gaming/:id', gamingController.deleteGaming);

// Rotas para Logs
router.post('/logs', logController.createLog);
router.get('/logs/user/:id_user', logController.getLogsByUserId);
router.put('/logs/:id', logController.updateLog);
router.delete('/logs/:id', logController.deleteLog);

module.exports = router;
