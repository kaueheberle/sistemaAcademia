const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use(authRoutes);
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API da Academia está rodando! 🏋️');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
