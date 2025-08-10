const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const prisma = new PrismaClient();
  const email = 'admin@example.com';
  const exists = await prisma.usuario.findUnique({ where: { email } });
  if (!exists) {
    const senha_hash = await bcrypt.hash('admin123', 10);
    await prisma.usuario.create({
      data: {
        nome: 'Administrador',
        email,
        senha_hash,
        nivel_acesso: 'admin'
      }
    });
    console.log('Usuário admin criado');
  }
  await prisma.$disconnect();
}

module.exports = seedAdmin;
