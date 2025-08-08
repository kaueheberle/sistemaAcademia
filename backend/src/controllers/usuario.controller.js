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

// GET ID USUARIOS

const usuarioService = require("../services/usuario.service");

async function listarTodos(req, res) {
  try {
    const usuarios = await usuarioService.listarTodos();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
}

async function buscarUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.buscarPorId(parseInt(id));
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
}

module.exports = {
  listarTodos,
  buscarUsuarioPorId,
};
