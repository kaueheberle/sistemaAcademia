const service = require('../services/usuario.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await service.buscarUsuarioPorEmail(email);
  if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
  if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });

  const token = jwt.sign(
    { id: usuario.id_usuario, nivel_acesso: usuario.nivel_acesso },
    process.env.JWT_SECRET || 'secretKey',
    { expiresIn: '1h' }
  );

  res.json({ token });
};

module.exports = { login };
