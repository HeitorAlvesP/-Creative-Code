import mongoose from "mongoose";    

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nome: { type: String, required: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true }
  });

  const User = mongoose.model('User', UserSchema);
    
   //expostar a função para outros arquivos
  export default User;