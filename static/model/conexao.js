import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbPath = path.join(__dirname, './database.sqlite');


const directory = path.dirname(dbPath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true }); 
}


const db = new Database(dbPath);


const connectDB = () => {
  return db; 
};

if (db) { 
  console.log("Conectado ao SQLite");
} else { 
  console.log("Falha ao conectar ao SQLite");
}

export default connectDB;