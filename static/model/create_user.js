import connectDB from './conexao.js'; 


const db = connectDB();


const createUsersTable = () => {
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

  db.prepare(query).run(); 
};


export const insertUser = (userData) => {
  const query = `
    INSERT INTO users (email, nome, password, cpf, adm)
    VALUES (?, ?, ?, ?, ?)
  `;

  const { email, nome, password, cpf, adm = 0 } = userData;
  db.prepare(query).run(email, nome, password, cpf, adm);
};


export const getUserByEmail = (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    return db.prepare(query).get(email); 
  } catch (error) {
    console.error("Erro ao buscar email:", error);
    return null;
  }

};


export const getUserByCpf = (cpf) => {
  try {
    const query = `SELECT * FROM users WHERE cpf = ?`;
    return db.prepare(query).get(cpf) || null;
  } catch (error) {
    console.error("Erro ao buscar CPF:", error);
    return null;
  }
};


createUsersTable(); 


const create_user = {
  insertUser,
  getUserByEmail,
  getUserByCpf,
  db
};

export default create_user;