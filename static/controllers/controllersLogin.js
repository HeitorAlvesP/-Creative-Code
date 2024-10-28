import Database from 'better-sqlite3';

async function realiza_login(req, res) {
  const { email, password } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const existingUser = db.prepare(query).get(email, password); 

    if (existingUser) {

      req.session.loggedIn = true;
      req.session.userId = existingUser.id;

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