const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });

  const [scheme, token] = authHeader.split(' ');
  if (!token || scheme.toLowerCase() !== 'bearer')
    return res.status(401).json({ erro: 'Token malformatado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

module.exports = authMiddleware;
