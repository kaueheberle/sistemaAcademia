const express = require('express');
const controller = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(auth);

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
