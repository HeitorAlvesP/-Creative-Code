import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defina o caminho do banco de dados
const dbPath = path.join(__dirname, './database.sqlite');

// Verifica se a pasta existe, caso contrário, cria a pasta
const directory = path.dirname(dbPath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true }); // Cria a pasta se não existir
}

// Cria a conexão com o banco de dados
const db = new Database(dbPath);

// Função para retornar a conexão
const connectDB = () => {
  console.log("Conectado ao SQLite");
  return db;
};

// Exporta a função de conexão e a instância do banco de dados
export default { connectDB, db };