const express = require('express');
const path = require('path');
const app = express();
const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const seedAdmin = require('./utils/seedAdmin');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(authRoutes);
app.use('/usuarios', usuarioRoutes);


seedAdmin();

main
app.get('/api', (req, res) => {
  res.send('API da Academia está rodando! 🏋');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
