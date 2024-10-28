import * as create_user from '../model/create_user.js';
import ValidaCPF from '../../public/js/valida_cpf.js';

async function cria_conta(req, res){  
    try {
      const {email, nome, password, confirm_password, cpf} = req.body;

      if (password !== confirm_password){
        return res.status(400).json({ error: "As senhas não coincidem" });
      }

      let validaCpf = new ValidaCPF(cpf);
      if(!validaCpf.valida()){
        return res.status(400).json({ error: "CPF informado é inválido" });
      }

      const existingUser = create_user.getUserByCpf(create_user.db, cpf); // Certifique-se de passar o db
      if (existingUser) {
        return res.status(400).json({ error: "CPF já cadastrado" });
      }

      create_user.insertUser(create_user.db, {
        email,
        nome,
        password,
        cpf
      });
      
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("Iniciando criação de conta:", req.body);

    const existingUser = create_user.getUserByCpf(create_user.db, cpf);
    console.log("Usuário existente encontrado:", existingUser);
}

export { cria_conta };