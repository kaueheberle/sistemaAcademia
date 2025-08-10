async function carregarUsuarios() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/index.html';
    return;
  }
  const response = await fetch('/usuarios', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    const usuarios = await response.json();
    const tbody = document.querySelector('#usuarios-table tbody');
    usuarios.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.id_usuario}</td><td>${u.nome}</td><td>${u.email}</td><td>${u.nivel_acesso}</td>`;
      tbody.appendChild(tr);
    });
  } else if (response.status === 401) {
    window.location.href = '/index.html';
  }
}

document.addEventListener('DOMContentLoaded', carregarUsuarios);
