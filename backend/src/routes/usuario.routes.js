const express = require('express');
const controller = require('../controllers/usuario.controller');
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;

// GET ID USARIO

router.get("/usuarios", usuarioController.listarTodos);
router.get("/usuarios/:id", usuarioController.buscarUsuarioPorId);
