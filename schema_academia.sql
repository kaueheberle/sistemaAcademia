
-- =============================================
-- ARQUIVO: schema_academia.sql
-- DESCRIÇÃO: Estrutura de banco de dados para sistema de academia
-- AUTOR: Kauã Heberle
-- =============================================

-- TABELA: usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    nivel_acesso VARCHAR(20) NOT NULL CHECK (nivel_acesso IN ('admin', 'recepcionista', 'instrutor', 'financeiro')),
    ativo BOOLEAN DEFAULT TRUE
);

-- TABELA: planos
CREATE TABLE planos (
    id_plano SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    duracao_meses INTEGER NOT NULL CHECK (duracao_meses > 0)
);

-- TABELA: alunos
CREATE TABLE alunos (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    plano_atual INTEGER REFERENCES planos(id_plano),
    data_vencimento DATE NOT NULL,
    foto_url TEXT,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'bloqueado')),
    digital_hash TEXT
);

-- TABELA: pagamentos
CREATE TABLE pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL REFERENCES alunos(id_aluno) ON DELETE CASCADE,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
    valor_pago NUMERIC(10, 2) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    referente_a VARCHAR(20),
    forma_pagamento VARCHAR(20) CHECK (forma_pagamento IN ('dinheiro', 'pix', 'cartao', 'outro'))
);

-- TABELA: aulas
CREATE TABLE aulas (
    id_aula SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    dia_semana VARCHAR(10) NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    id_professor INTEGER REFERENCES usuarios(id_usuario)
);

-- TABELA: presencas
CREATE TABLE presencas (
    id_presenca SERIAL PRIMARY KEY,
    id_aluno INTEGER NOT NULL REFERENCES alunos(id_aluno) ON DELETE CASCADE,
    id_aula INTEGER NOT NULL REFERENCES aulas(id_aula),
    data DATE NOT NULL
);

-- TABELA: logs
CREATE TABLE logs (
    id_log SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    acao TEXT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    entidade_afetada VARCHAR(50),
    id_referencia INTEGER
);
