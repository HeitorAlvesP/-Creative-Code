import User from '../model/create_user.js';

async function realiza_login (req, res){
    const { email, password } = req.body; 
  
    try {
      const existingUser = await User.findOne({ email: email, password: password });
      if (existingUser) {
        req.session.loggedIn = true;
        req.session.userId = existingUser._id;
        return res.status(200).redirect('/home');
      } else {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      }
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export {realiza_login};