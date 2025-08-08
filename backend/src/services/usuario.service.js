const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarUsuarios = async () => {
  return await prisma.usuario.findMany();
};

const criarUsuario = async (dados) => {
  return await prisma.usuario.create({ data: dados });
};

const buscarUsuarioPorId = async (id) => {
  return await prisma.usuario.findUnique({
    where: { id_usuario: Number(id) },
  });
};

const atualizarUsuario = async (id, dados) => {
  return await prisma.usuario.update({
    where: { id_usuario: Number(id) },
    data: dados,
  });
};

const deletarUsuario = async (id) => {
  return await prisma.usuario.delete({
    where: { id_usuario: Number(id) },
  });
};

const buscarUsuarioPorEmail = async (email) => {
  return await prisma.usuario.findUnique({
    where: { email },
  });
};

module.exports = {
  listarUsuarios,
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  buscarUsuarioPorEmail,
};
