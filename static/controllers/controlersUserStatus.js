import User from '../model/create_user.js';


async  function bloqueia_menu (req, res){
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
  
    try {
      const user = await User.findById(req.session.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.json({ adm: user.adm });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao buscar o usuário', error: err.message });
    }
}

export {bloqueia_menu}; 