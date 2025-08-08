const service = require('../services/usuario.service');

const listar = async (req, res) => {
  const usuarios = await service.listarUsuarios();
  res.json(usuarios);
};

const criar = async (req, res) => {
  const novoUsuario = await service.criarUsuario(req.body);
  res.status(201).json(novoUsuario);
};

const buscarPorId = async (req, res) => {
  const usuario = await service.buscarUsuarioPorId(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(usuario);
};

const atualizar = async (req, res) => {
  const usuario = await service.atualizarUsuario(req.params.id, req.body);
  res.json(usuario);
};

const deletar = async (req, res) => {
  await service.deletarUsuario(req.params.id);
  res.status(204).end();
};

module.exports = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  deletar,
};
