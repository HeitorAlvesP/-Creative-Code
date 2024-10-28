import * as create_user from '../model/create_user.js';
import ValidaCPF from '../../public/js/valida_cpf.js';

async function cria_conta(req, res) {  
  try {
    const { email, nome, password, confirm_password, cpf } = req.body;

    console.log("Banco de dados:", create_user.db); // Verifique se o db está definido

    if (password !== confirm_password) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    let validaCpf = new ValidaCPF(cpf);
    if (!validaCpf.valida()) {
      return res.status(400).json({ error: "CPF informado é inválido" });
    }

    // Aqui você deve verificar se o CPF existe
    const existingUser = create_user.getUserByCpf(create_user.db, cpf);
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // Insere o usuário
    create_user.insertUser(create_user.db, {
      email,
      nome,
      password,
      cpf
    });
    
    res.status(201).json({ message: "Usuário criado com sucesso" });
    
    console.log("Iniciando criação de conta:", req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { cria_conta };