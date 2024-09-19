import User from '../model/create_user.js';
import ValidaCPF from '../../public/js/valida_cpf.js';

async function  cria_conta(req, res){  
    try {
      const {email, nome, password, confirm_password, cpf} = req.body

      if (password !== confirm_password){
        return res.status(400).json({ error: "As senhas não coincidem" })
      }

      let validaCpf = new ValidaCPF(cpf)
      if(!validaCpf.valida()){
        return res.status(400).json({ error: "CPF informado é invalido" })
      }

      const existingUser = await User.findOne({ cpf: cpf });
      if (existingUser) {
          return res.status(400).json({ error: "CPF já cadastrado" });
      }

      const newUser = new User({

        email: email,
        nome: nome,
        password: password,
        cpf: cpf

      })

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {cria_conta };
