import Database from 'better-sqlite3';

// Conexão com o banco de dados
// const db = new Database('./meu_db.sqlite');

// Função para realizar o login
async function realiza_login(req, res) {
  const { email, password } = req.body;

  try {
    // Busca o usuário no banco de dados SQLite pelo email e senha
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const existingUser = db.prepare(query).get(email, password); // Retorna um único usuário

    if (existingUser) {
      // Se o usuário for encontrado, define as variáveis de sessão
      req.session.loggedIn = true;
      req.session.userId = existingUser.id; // Em SQLite, o campo de id seria 'id'

      return res.status(200).redirect('/home');
    } else {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export { realiza_login };