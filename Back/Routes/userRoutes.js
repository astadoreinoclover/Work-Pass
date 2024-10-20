const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// Rota para criação de usuário
router.post('/users', userController.createUser);

// Rota para listagem de usuários
router.get('/users', userController.getUsers);

// Rota para obter um único usuário
router.get('/users/:id', userController.getUserById);

// Rota para atualização de usuário
router.put('/users/:id', userController.updateUser);

// Rota para deletar usuário
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
