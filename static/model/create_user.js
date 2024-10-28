import Database from 'better-sqlite3';
import connectDB from './conexao.js'; // Importe a função de conexão

// Inicializa a conexão com o banco de dados
const db = connectDB();

// Função para criar a tabela de usuários
const createUsersTable = (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      nome TEXT NOT NULL,
      password TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      adm INTEGER DEFAULT 0
    )
  `;

  db.prepare(query).run(); // Executa a criação da tabela se ela não existir
};

// Chama a função para criar a tabela
createUsersTable(db);

// Função para inserir um usuário na tabela
const insertUser = (db, userData) => {
  const query = `
    INSERT INTO users (email, nome, password, cpf, adm)
    VALUES (?, ?, ?, ?, ?)
  `;

  const { email, nome, password, cpf, adm = 0 } = userData;
  db.prepare(query).run(email, nome, password, cpf, adm);
};

// Função para buscar um usuário pelo email
export const getUserByEmail = (db, email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return db.prepare(query).get(email); // Retorna um único usuário
};

// Função para buscar um usuário pelo CPF
export const getUserByCpf = (db, cpf) => {
  try {
    const query = `SELECT * FROM users WHERE cpf = ?`;
    return db.prepare(query).get(cpf) || null;
  } catch (error) {
    console.error("Erro ao buscar CPF:", error);
    return null;
  }
};

// Agrupa e exporta as funções
const create_user = {
  createUsersTable,
  insertUser,
  getUserByEmail,
  getUserByCpf,
  db // Exporta o banco de dados também para reuso
};

export default create_user;